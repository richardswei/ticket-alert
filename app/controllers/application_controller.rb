class ApplicationController < ActionController::Base
  require 'httparty'
  require 'json'

  def get_api_response(pageNumber=1)
    client_id = get_client_id
    response = HTTParty.get("https://api.seatgeek.com/2/events?performers.slug=golden-state-warriors&per_page=25&page=#{pageNumber}&client_id=#{client_id}" ,format: :plain)
    parsed_json = JSON.parse(response.body, symbolize_names: true)
    meta_data = parsed_json[:meta]
    events_list = parsed_json[:events]
    events_data = events_list.map do |event|
      {
        :id => event[:id],
        :title => event[:title],
        :short_title => event[:short_title],
        :lowest_price => event[:stats][:lowest_sg_base_price],
        :event_time_utc => event[:datetime_utc],
        :expiration_time => event[:visible_until_utc],
        :performers => event[:performers].map{|x| x.slice(:slug, :name, :id, :home_venue_id)},
        :url => event[:url]
      }
    end
    
    total_results = meta_data[:total]
    pageNumber = meta_data[:page]

    if (pageNumber>=(total_results/25.0).ceil || pageNumber>10)
      return events_data
    else
      pageNumber += 1
      return events_data.concat(get_api_response(pageNumber))
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
      performer_hash = performer.first
      Performer.where(performer_id: performer_hash[:id]).
        first_or_initialize.update_attributes!(
          :slug => performer_hash[:slug],
          :name => performer_hash[:name],
          :venue_id => performer_hash[:home_venue_id]
        )
    end
  end


  private
  def get_client_id
    'MTk4Mjk2NTB8MTU3NTkyNDE3MS43Mg'
  end

end
