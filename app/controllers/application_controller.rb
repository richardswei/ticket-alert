class ApplicationController < ActionController::Base
  require 'httparty'
  require 'json'
  require 'date'

  def get_api_response(block, pageNumber=1)
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
    # yield to block where do can do database stuff
    # yield(events_data)
    block.call(events_data)
    
    total_api_calls = (total_results/(results_per_page.to_f)).ceil
    p "#{pageNumber} of #{total_api_calls}"
    if (pageNumber>=total_api_calls)
      return
    else
      pageNumber += 1
      get_api_response(block, pageNumber)
    end
  end


  private
  def get_client_id
    'MTk4Mjk2NTB8MTU3NTkyNDE3MS43Mg'
  end

end
