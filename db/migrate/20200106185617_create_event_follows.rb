class CreateEventFollows < ActiveRecord::Migration[5.2]
  def change
    create_table :event_follows do |t|

      t.timestamps
    end
  end
end
