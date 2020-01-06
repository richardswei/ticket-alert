class AddFieldsToEventFollow < ActiveRecord::Migration[5.2]
  def change
    add_column :event_follows, :user_id, :integer
    add_column :event_follows, :event_id, :integer
    add_index :event_follows, [:user_id, :event_id], unique: true
  end
end
