class HomeController < ApplicationController
  
  def index
    @performers = Performer.all
    # email test
  end

  def populate_database
    populate_db_proc = Proc.new { |response| populate_events(response) }
    get_api_response(populate_db_proc)
  end

  def set_prices_from_api
    set_prices_proc = Proc.new{ |response| update_prices(response) }
    get_api_response(set_prices_proc)
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
      current_event = Event.where(event_number: event[:id]).
        first_or_initialize
        current_event.update_attributes!(
          :name => event[:title],
          :url => event[:url],
          :price_curr => event[:lowest_price],
          :event_time_utc => DateTime.parse(event[:event_time_utc]),
          :expiration_time => DateTime.parse(event[:expiration_time]),
          # :venue_number => event[:venue][:id],
          :venue => Venue.find_by(venue_number: venue_data[:venue_number])
        )
      event[:performers].each do |performer|
        current_event.performers << Performer.find_by(performer_number: performer[:id]) 
      end
    end
  end

  def update_prices(api_response)
    discounted = []
    api_response.each do |event|
      # populate event
      current_event = Event.find_by(event_number: event[:id])  
      return if current_event.nil?
      return if event[:lowest_price].nil?
      return if current_event[:price_curr].nil?
      if event[:lowest_price] < current_event[:price_curr]
        p "price change detected"
        discounted.push(name: event[:title], old_price: current_event[:price_curr], new_price: event[:lowest_price])
      end
      current_event.update_attributes!(
        :price_curr => event[:lowest_price],
      )
    end
    if discounted.length > 0
      UserMailer.discount_alert(discounted).deliver_later
    end
  end


end
