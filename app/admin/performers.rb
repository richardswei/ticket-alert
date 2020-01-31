ActiveAdmin.register Performer do

  index do
    selectable_column
    id_column

    column :name
    column :url
    column :slug
    column :performer_number

    actions
  end

  filter :name
  filter :url
  filter :slug
  filter :performer_number
  
end

