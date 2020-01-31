ActiveAdmin.register Event do

  index do
    selectable_column
    id_column
    
    column :name
    column :url
    column :event_number
    column :expiration_time
    column :event_time_utc
    column :last_240_prices
    column :home_team

    actions
  end

  filter :name
  filter :url
  filter :event_number
  filter :event_time_utc
  
end

