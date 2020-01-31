class UserMailer < ApplicationMailer
  default from: 'ticketalertproduction@gmail.com'

  def discount_alert(user, events)
    if events.length>0
      @user = user
      @url  = Rails.application.config.action_mailer.default_url_options
      @events = events
      mail(to: @user.email, subject: 'Prices Update')
      p "Email to #{@user.username} sent"
    else
      p "Email to #{@user.username} not sent (no discounted events)"
    end
  end

 
end
