class SendEmail
  def initialize
  end

  def perform
    send_email
  end
  
  def send_email
    User.all.each do |user|
      relevant_events = filter_discounted_events(user.events).to_a
      p "sending email to #{user.username} at #{user.email}"
      UserMailer.discount_alert(user, relevant_events).deliver_now
    end
  end

  def filter_discounted_events(events)
    events.where('price_curr < last_price').distinct
  end

end