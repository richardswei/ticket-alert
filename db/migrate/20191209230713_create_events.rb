class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|

      t.timestamps
      t.string :name, default: ""
      t.string :url, default: ""
      t.integer :event_number
      t.integer :price_curr, default: 0
      t.datetime :event_time_utc
      t.string :price_t30, array: true, default: []
    end
    add_index :events, :event_number, unique: true
    add_index :events, :name
  end
end
