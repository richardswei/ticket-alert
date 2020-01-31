ActiveAdmin.register Performer do

  index do
    selectable_column
    id_column

    column :name
    column :url
    column :slug
    column :performer_number
    column :home_venue_number
    column :taxonomy
    column :division
    column :colors
    actions
  end
  filter :name
  filter :url
  filter :slug
  filter :performer_number
  filter :home_venue_number
  filter :taxonomy
  filter :division
end

