ActiveAdmin.register User do

  index do
    selectable_column
    id_column
    
    column :username
    column :email
    column :events

    actions
  end

  filter :username
  filter :email

end

