class EventsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user!, :except => [:show]

  def show
    @event = Event.find(params[:id])
    @performer = Performer.find(params[:performer_id])
    # react_component("EventDetails")
    render component: 'EventDetails', props: { 
      event: @event,
      performer: @performer,
      checked: false,
      csrf: form_authenticity_token,
      current_user: current_user,
    }
  end

  def add_follow
    # @user = User.find(current_user.id)
    # @event = Event.find(params[:id])
    @event_follow = EventFollow.new(user_id: user_signed_in? ? current_user.id : nil, event_id: params[:id])
    if @event_follow.save
      p 'a'
    else
      flash[:error] = @event_follow.errors.messages 
    end
  end

end
