class SearchController < ApplicationController
 
  def index
    @q = params[:q]
    @performers_search = Performer.limit(100).ransack(name_cont: @q)
    @events_search = Event.limit(100).ransack(name_cont: @q)
    @performers_results = @performers_search.result
    @events_results = @events_search.result.order("event_time_utc ASC").
        as_json(include: [:performers => {:only=> [:id,:slug]}])
    @followed_event_ids = current_user ? @events_search.result.
      where(id: User.find(current_user.id).
      event_follows.pluck(:event_id)).pluck(:id) : []
    @csrf = form_authenticity_token

    
  end

end