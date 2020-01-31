class UpdateDatabase
  # UpdateDatabase.new.populate_database - Update database with new events and new information for existing events
  # UpdateDatabase.new.update_events - delete expired events and update the existing events' prices
  def initialize
  end
  
  def taxonomy_list
    Rails.configuration.taxonomies_allowed
  end

  def populate_database
    populate_db_proc = Proc.new { |response|
      populate_events(response) 
    }
    p 'begin populating database'
    taxonomy_list.each do |taxonomy|
      p "begin populating #{taxonomy} events" 
      get_api_response(taxonomy, populate_db_proc)
    end
    p 'finished populating database'
  end
  
  def update_events
    p 'begin deleting expired events...'
    delete_expired_events
    p 'finished deleting expired events.'
    p 'begin updating events'
    set_prices_from_api
    p 'finished updating events'
  end


  private
    def get_api_response(taxonomy_to_update, block, pageNumber=1)
      results_per_page = 50
      response = HTTParty.get(url_helper(taxonomy_to_update, results_per_page, pageNumber, get_client_id),format: :plain)
      parsed_json = JSON.parse(response.body, symbolize_names: true)
      events_list = parsed_json[:events]
      # yield to block where do can do database stuff
      # yield(events_data)
      block.call(events_list)

      metadata = parsed_json[:meta]
      total_results = metadata[:total]
      pageNumber = metadata[:page]
      total_api_calls = (total_results/(results_per_page.to_f)).ceil
      p "Updated database with API call #{pageNumber} of #{total_api_calls}"
      if (pageNumber>=total_api_calls)
        return
      else
        pageNumber += 1
        get_api_response(taxonomy_to_update, block, pageNumber)
      end
    end

    # return the slug of the first home team; arg should be an event obj
    def get_home_team(event)
      home_team = event[:performers].find {|team| team[:home_team]}
      if home_team.nil?
        lowercase_name = event[:title].downcase.split(' at ')[1]
        home_team_slug = lowercase_name.nil? ?
          "none" : lowercase_name.gsub(' ','-')
      else 
        home_team_slug = home_team[:slug]
      end
      home_team_slug
    end

    def set_prices_from_api
      set_prices_proc = Proc.new{ |response| update_prices(response) }
      taxonomy_list.each do |taxonomy|
        get_api_response(taxonomy, set_prices_proc)
      end
    end

    def delete_expired_events
      Event.where("event_time_utc < ?", 1.days.ago).destroy_all
    end

    def populate_events(api_response)
      api_response.each do |event|
        # populate performers
        performers_data = event[:performers]
        # create a set of performer_number checked in this call
        performers_set = Set.new([])
        performers_data.each do |performer|
          if performers_set.add?(performer[:id]).nil?
            next
          end
          divisions = performer[:divisions]
          colors = performer[:colors]
          Performer.where(performer_number: performer[:id]).
            first_or_initialize.update_attributes!(
              :slug => performer[:slug],
              :name => performer[:name],
              :home_venue_number => performer[:home_venue_id],
              :url => performer[:url],
              :division => divisions.nil? ? [nil] : performer[:divisions].collect{|item| item[:display_name]},
              :colors => colors.nil? ? [nil] : performer[:colors][:primary],
              :taxonomy => event[:type],
            )
        end

        # populate event
        current_event = Event.where(event_number: event[:id]).first_or_initialize
        current_event.update_attributes!(
          :name => event[:title],
          :url => event[:url],
          :home_team => get_home_team(event),
          :event_time_utc => DateTime.parse(event[:datetime_utc]),
          :local_start_time => event[:datetime_local],
          :taxonomy => event[:type],
        )
        # for each performer in the api_response, find/build the association
        event[:performers].each do |performer|
          current_performer = Performer.find_by(performer_number: performer[:id])
          # add performer if it doesnt exist
          current_event.performers << current_performer unless current_event.performers.include?(current_performer)
        end
      end
    end

    def update_prices(api_response)
      current_time = Time.now
      api_response.each do |event|
        new_price = event[:stats][:lowest_sg_base_price]

        # populate event
        current_event = Event.find_by(event_number: event[:id])  
        return if current_event.nil?

        # there may not be a selling ticket
        price_list = current_event[:last_240_prices]
        #  need to pass 3 conditions to actually allow checking
        price_dropped = priceDropped(price_list, new_price)

        current_price_hash = {
          price: new_price,
          time: current_time
        }
        updated_last_240 = price_list.push(current_price_hash)
        if updated_last_240.length>240
          updated_last_240.shift()
        end
        current_event.update_attributes!(
          :last_240_prices => updated_last_240,
          :dropped => price_dropped
        )
      end
    end
    
    def url_helper(taxonomy_to_update, results_per_page, pageNumber, client_id)
      "https://api.seatgeek.com/2/events?taxonomies.name=#{taxonomy_to_update}&per_page=#{results_per_page}&page=#{pageNumber}&client_id=#{client_id}"
    end

    def get_client_id
      ENV['PRICE_ALERT_PASS']
    end

    def priceDropped(price_list, new_price)
      if price_list.length>0
        if !new_price.nil? && !price_list.last["price"].nil? 
          if new_price<price_list.last["price"]
            true
          else
            false
          end
        end
      end
    end

end