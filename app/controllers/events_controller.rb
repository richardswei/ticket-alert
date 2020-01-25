class EventsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user!, :except => [:show]
  include EventsHelper
  
  def show
    @event = Event.find(params[:id])
    @performer_slugs = @event.performers.pluck(:slug).uniq
    render component: 'EventDetails', props: { 
      event_followed: current_user ? @event.event_follows.pluck(:user_id).include?(current_user.id) : nil,
      event: @event,
      performer_slugs: @performer_slugs,
      checked: false,
      csrf: form_authenticity_token,
      current_user: current_user,
    }, prerender: false
  end

  def add_individual_follow
    add_follow(params[:id])
  end

  def delete_individual_follow
    delete_follow(params[:id])
  end

end
