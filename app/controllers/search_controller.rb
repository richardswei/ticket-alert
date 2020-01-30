class SearchController < ApplicationController
 
  def index
    @q = params[:q]
    @performers_search = Performer.ransack(name_cont: @q)
    @events_search = Event.ransack(name_cont: @q)
    @performers_results = @performers_search.result
    @events_results = @events_search.result
  end

end