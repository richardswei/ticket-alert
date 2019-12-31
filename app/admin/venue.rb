ActiveAdmin.register Venue do

  index do
    selectable_column
    id_column

    column :slug
    column :name
    column :url
    column :address
    column :city
    column :state
    column :postal_code
    column :venue_number
    column :timezone

    actions
  end

  filter :name
  filter :url
  filter :city
  filter :state
  filter :postal_code
  filter :venue_number
  filter :timezone
  
end

