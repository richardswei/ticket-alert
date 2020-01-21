class PerformersController < ApplicationController
  def index
    @performers = Performer.all
  end

  def show
    @performer = Performer.find(params[:id])
    @header = "All Home #{@performer.name} Events"
    @events = @performer.events.all.distinct.
      order("event_time_utc ASC").as_json(include: :venue)
    render component: 'PerformerEvents', props: { 
      events: @events,
      performer: @performer,
      checked: false,
      csrf: form_authenticity_token,
      current_user: current_user,
    }, prerender: false
  end

end