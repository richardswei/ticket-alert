class PerformersController < ApplicationController
  
  def index
    @performers = Performer.all
  end

  def show
    @performer = Performer.find(params[:id])
    @events = @performer.events.all.distinct
    all_home_events_followed = false
    # determine status of follow events status
    if current_user
      total_home_events = @events
        .map{|event| event['home_team']}
        .select{|slug| slug == @performer.slug}.count
      followed_home_events_count = Event.
        where(id: User.find(current_user.id).
        event_follows.pluck(:event_id)).
        pluck(:home_team).select{|slug| slug == @performer.slug}.count
      all_home_events_followed = current_user ? followed_home_events_count==total_home_events : false
    end
    render component: 'PerformerEvents', props: {
      all_home_events_followed: all_home_events_followed,
      events: @events.order("event_time_utc ASC").
        as_json(include: [:venue, :performers => {:only=> [:id,:slug]}]),
      performer: @performer,
      checked: false,
      csrf: form_authenticity_token,
      current_user: current_user,
    }, prerender: false
  end

  include EventsHelper
  def add_team_follow
    performer = Performer.find(params[:id])
    events_ids = performer.events.distinct.select{|event| event.home_team==performer.slug}.pluck(:id)
    events_to_do = events_ids.count
    events_ids.each_with_index do |id, idx|
      add_follow(id)
      p "#{idx+1} of #{events_to_do}"
    end
  end

  def delete_team_follow
    events_ids = Performer.find(params[:id]).events.distinct.pluck(:id)
    events_to_do = events_ids.count
    events_ids.each_with_index do |id, idx|
      delete_follow(id)
      p "#{idx+1} of #{events_to_do}"
    end
  end

end
