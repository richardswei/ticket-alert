class UserMailer < ApplicationMailer
  default from: 'pricealertbyrichard@gmail.com'

  def discount_alert(user)
    events = get_discounts_by_performer(16)
    @user = user
    @url  = 'http://localhost:3000/'
    p events.pluck("id")
    @events = events
    mail(to: @user.email, subject: 'Prices Update')
  end

  def get_discounts_by_performer(performer_id)
    discounted_events = Performer.find(performer_id).events.where('price_curr < last_price').distinct.
      select([:id, :name, :price_curr, :last_price]).as_json
    discounted_events
  end

end
