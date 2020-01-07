class EventsController < ApplicationController

  def show
    @event = Event.find(params[:id])
    @performer = Performer.find(params[:performer_id])
  end

end
