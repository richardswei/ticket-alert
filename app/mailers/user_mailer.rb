class UserMailer < ApplicationMailer
  default from: 'pricealertbyrichard@gmail.com'

  def discount_alert(events)
    @url  = 'http://localhost:3000/'
    @events = events
    mail(to: "superaznpanda@gmail.com", subject: 'Prices')
  end

end
