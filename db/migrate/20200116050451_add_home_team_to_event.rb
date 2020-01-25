class AddHomeTeamToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :home_team, :string
  end
end
