module EventsHelper
  
  def add_follow(event_id)
    @event_follow = EventFollow.find_or_create_by(user_id: user_signed_in? ? current_user.id : nil, event_id: event_id)
    if @event_follow.try(:save)
      p 'Event followed'
    else
      p "Event follow not successfully saved"
    end
  end

  def delete_follow(event_id)
    @event_follow = EventFollow.find_by({user: current_user.id, event_id: event_id } )
    if @event_follow.try(:destroy)
      p "Event follow found and destroyed"
    else
      p "Event follow not found or was not successfully destroyed"
    end
  end

end
