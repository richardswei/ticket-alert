class PerformersController < ApplicationController
  def index
    @performers = Performer.all
  end

  def show
    @performer = Performer.find(params[:id])
    @events = @performer.events.all.distinct.order("event_time_utc ASC")
  end
  
end