desc "Setting up db"
task :drop_db_and_reseed => :environment do
  Rake::Task["db:drop"].execute
  Rake::Task["db:create"].execute
  Rake::Task["db:migrate"].execute 
  Rake::Task["db:seed"].execute 

end