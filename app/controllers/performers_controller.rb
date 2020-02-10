class PerformersController < ApplicationController
  
  def index
    @performers = Performer.all
  end

  def show
    @performer = Performer.find(params[:id])
    @events = @performer.events.order("event_time_utc ASC")
    @followed_events = current_user ? @events.
      where(id: User.find(current_user.id).
      event_follows.pluck(:event_id)).pluck(:id) : []
    all_home_events_followed = false
    # determine status of follow events status
    if current_user
      all_home_events_followed = all_home_events_followed(current_user, @events, @performer)
    end
    render component: 'PerformerEvents', props: {
      all_home_events_followed: all_home_events_followed,
      followed_event_ids: @followed_events,
      events: @events.
        as_json(include: [:performers => {:only=> [:id,:slug]}]),
      performer: @performer,
      checked: false,
      csrf: form_authenticity_token,
      current_user: current_user,
    }, prerender: false
  end

  def all_home_events_followed(current_user, events, performer)
    total_home_events = events
      .map{|event| event['home_team']}
      .select{|slug| slug == performer.slug}.count
    followed_home_events_count = Event.
      where(id: User.find(current_user.id).
      event_follows.pluck(:event_id)).
      pluck(:home_team).select{|slug| slug == performer.slug}.count
    return current_user ? followed_home_events_count==total_home_events : false
  end

  def mlb
    @performers = Performer.where({taxonomy: "mlb"})
  end
  def nba
    @performers = Performer.where({taxonomy: "nba"})
  end
  def nhl
    @performers = Performer.where({taxonomy: "nhl"})
  end
  def nfl
    @performers = Performer.where({taxonomy: "nfl"})
  end

  include EventsHelper
  def add_team_follow
    performer = Performer.find(params[:id])
    events_ids = performer.events.select{|event| event.home_team==performer.slug}.pluck(:id)
    events_to_do = events_ids.count
    events_ids.each_with_index do |id, idx|
      add_follow(id)
      p "#{idx+1} of #{events_to_do}"
    end
  end

  def delete_team_follow
    events_ids = Performer.find(params[:id]).events.pluck(:id)
    events_to_do = events_ids.count
    events_ids.each_with_index do |id, idx|
      delete_follow(id)
      p "#{idx+1} of #{events_to_do}"
    end
  end

end
