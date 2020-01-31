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
      metadata = parsed_json[:meta]
      events_list = parsed_json[:events]
      events_data = events_list.map do |event|
        {
          :id => event[:id],
          :title => event[:title],
          :short_title => event[:short_title],
          :lowest_price => event[:stats][:lowest_sg_base_price],
          :event_time_utc => event[:datetime_utc],
          :expiration_time => event[:visible_until_utc],
          :performers => event[:performers].map{|x| x.slice(:slug, :name, :id, :home_venue_id, :url)},
          :venue => event[:venue].slice(:timezone, :slug, :name, :url, :id, :city, :state, :postal_code, :address),
          :url => event[:url],
          :home_team => get_home_team(event)
        }
      end
      total_results = metadata[:total]
      pageNumber = metadata[:page]
      # yield to block where do can do database stuff
      # yield(events_data)
      block.call(events_data)
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
        home_team_slug = 
          lowercase_name.nil? ? "none" : lowercase_name.gsub(' ','-')
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
      Event.where("expiration_time < ?", 0.days.ago).destroy_all
    end

    def populate_events(api_response)
      api_response.each do |event|
        # populate performers
        performers_data = event[:performers]
        performers_data.each do |performer|
          Performer.where(performer_number: performer[:id]).
            first_or_initialize.update_attributes!(
              :slug => performer[:slug],
              :name => performer[:name],
              :home_venue_number => performer[:home_venue_id],
              :url => performer[:url]
            )
        end

        # populate venues
        venue_data = event[:venue]
        venue_data[:venue_number] = venue_data.delete :id
        Venue.where(venue_number: venue_data[:venue_number]).
          first_or_initialize.update_attributes!(
            venue_data
          )

        # populate event
        current_event = Event.where(event_number: event[:id]).first_or_initialize
        current_event.update_attributes!(
          :name => event[:title],
          :url => event[:url],
          :home_team => event[:home_team],
          :price_curr => event[:lowest_price],
          :event_time_utc => DateTime.parse(event[:event_time_utc]),
          :expiration_time => DateTime.parse(event[:expiration_time]),
          # :venue_number => event[:venue][:id],
          :venue => Venue.find_by(venue_number: venue_data[:venue_number])
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
      api_response.each do |event|
        # populate event
        current_event = Event.find_by(event_number: event[:id])  
        return if current_event.nil?
        current_price = event[:lowest_price]

        updated_last30 = current_event[:price_t30].push(current_price)
        if updated_last30.length>30
          updated_last30.shift()
        end
        current_event.update_attributes!(
          :price_t30 => updated_last30
        )
        current_event.update_attributes!(
          :price_curr => updated_last30[updated_last30.length-1],
          :last_price => updated_last30[updated_last30.length-2],
        )
      end
    end
    
    def url_helper(taxonomy_to_update, results_per_page, pageNumber, client_id)
      "https://api.seatgeek.com/2/events?taxonomies.name=#{taxonomy_to_update}&per_page=#{results_per_page}&page=#{pageNumber}&client_id=#{client_id}"
    end

    def get_client_id
      ENV['PRICE_ALERT_PASS']
    end

end