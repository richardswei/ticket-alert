class ApplicationController < ActionController::Base
  require 'httparty'
  require 'json'
  require 'date'

  def get_api_response(pageNumber=1)
    results_per_page = 50
    client_id = get_client_id
    response = HTTParty.get("https://api.seatgeek.com/2/events?taxonomies.name=nba&per_page=50&page=#{pageNumber}&client_id=#{client_id}" ,format: :plain)
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
        :url => event[:url]
      }
    end
    
    total_results = metadata[:total]
    pageNumber = metadata[:page]
    populate_performers(events_data)
    populate_events(events_data)
    # populate_venues(events_data)
    p pageNumber

    if (pageNumber>=(total_results/(results_per_page.to_f)).ceil || pageNumber>20)
      return
    else
      pageNumber += 1
      get_api_response(pageNumber)
    end

  end

  # def get_url_by_performer_name(name)
  # end

  # def get_url_by_performer_id(id)
  # end

  # def get_url_by_event_name(name)
  # end

  # def get_url_by_event_id(id)
  # end

  def populate_performers(api_response)
    performers_data = api_response.map {|x| x[:performers]}
    performers_data.each do |performer|
      performer_hash = performer.first #this gets the hash
      Performer.where(performer_number: performer_hash[:id]).
        first_or_initialize.update_attributes!(
          :slug => performer_hash[:slug],
          :name => performer_hash[:name],
          :home_venue_number => performer_hash[:home_venue_id],
          :url => performer_hash[:url]
        )
    end
  end

  def populate_events(api_response)
    api_response.each do |event|
      Event.where(event_number: event[:id]).
        first_or_initialize.update_attributes!(
          :name => event[:title],
          :url => event[:url],
          :price_curr => event[:lowest_price],
          :event_time_utc => DateTime.parse(event[:event_time_utc]),
          :expiration_time => DateTime.parse(event[:expiration_time]),
          :venue_number => event[:venue][:id]
        )

      venue_data = event[:venue]
      venue_data[:venue_number] = venue_data.delete :id
      Venue.where(venue_number: venue_data[:venue_number]).
        first_or_initialize.update_attributes!(
          venue_data
        )
    end
  end

  # def populate_venues(api_response)
  #   venue_data = api_response[:venue].rekey!(:id => venue_number)
  #   Venue.where(venue_number: venue_data[:id]).
  #     first_or_initialize.update_attributes!(
  #       venue_data
  #     )
  # end



  private
  def get_client_id
    'MTk4Mjk2NTB8MTU3NTkyNDE3MS43Mg'
  end

end
