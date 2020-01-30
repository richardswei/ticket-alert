desc "Heroku scheduler tasks"
task :email_discounted_events => :environment do
  puts "Sending out emails for discounted events."
  SendEmail.new.perform
  puts "Emails sent!"
end

task :update_events => :environment do
  puts "Updating events."
  UpdateDatabase.new.update_events
  puts "Events Updated!"
end


