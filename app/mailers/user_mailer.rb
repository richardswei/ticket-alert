class UserMailer < ApplicationMailer
  default from: 'pricealertbyrichard@gmail.com'

  def discount_alert(user)
    events = get_discounts_by_performer(16)
    if events.length>0
      @user = user
      @url  = 'http://localhost:3000/'
      @events = events
      mail(to: @user.email, subject: 'Prices Update')
    end
  end

  def get_discounts_by_performer(performer_id)
    Performer.find(16).events.where('price_curr < last_price').distinct.
      as_json(:include => { :venue => {
          :only => "timezone"
        }})

  end

end
