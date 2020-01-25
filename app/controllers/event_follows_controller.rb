class EventFollowsController < ApplicationController
  include EventsHelper

  def create
    event_follow = EventFollow.new(event_follow_params)
    if event_follow.save
      redirect_back fallback_location: '/', allow_other_host: false
    else
      redirect_back fallback_location: '/', allow_other_host: false
      p "Event follow not found or was not successfully destroyed"
    end
  end
  def destroy
    event_follow = EventFollow.find(params[:id])
    event_follow.destroy
    redirect_back fallback_location: '/', allow_other_host: false
  end
end
