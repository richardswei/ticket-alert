env :PATH, ENV['PATH']
# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
set :output, {:standard => 'log/cron_log.log', :error => 'log/cron_error_log.log'}
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
every 1.minute do # Many shortcuts available: :hour, :day, :month, :year, :reboot
  runner "SendEmail.new.perform"
end

every 30.minute do # Many shortcuts available: :hour, :day, :month, :year, :reboot
  runner "UpdateDatabase.new.update_events"
end
