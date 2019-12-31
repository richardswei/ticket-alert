ActiveAdmin.register Event do

  index do
    selectable_column
    id_column
    
    column :name
    column :url
    column :event_number
    column :price_curr
    column :expiration_time
    column :event_time_utc
    column :last_price
    column :price_t30

    actions
  end

  filter :name
  filter :url
  filter :event_number
  filter :price_curr
  filter :event_time_utc
  
end

