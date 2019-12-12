class UserMailer < ApplicationMailer
  default from: 'pricealertbyrichard@gmail.com'
 
  def welcome_email(user)
    @user = user
    @url  = 'http://localhost:3000/'
    mail(to: @user.email, subject: 'Welcome to TicketAlert')
    p 'sentemail'
  end

end
