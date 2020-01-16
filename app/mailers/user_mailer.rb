class UserMailer < ApplicationMailer
  default from: 'pricealertbyrichard@gmail.com'

  def discount_alert(user, events)
    if events.length>0
      p events
      @user = user
      @url  = 'http://localhost:3000/'
      @events = events.as_json(:include => { :venue => {
        :only => "timezone"
      }})
      mail(to: @user.email, subject: 'Prices Update')
    end
  end

 
end
