class SearchController < ApplicationController
 
  def index
    @q = params[:q]
    @performers_search = Performer.ransack(name_cont: @q).limit(50)
    @events_search = Event.ransack(name_cont: @q).limit(50)
    @performers_results = @performers_search.result
    @events_results = @events_search.result.order("event_time_utc ASC").
        as_json(include: [:performers => {:only=> [:id,:slug]}])
  end

end