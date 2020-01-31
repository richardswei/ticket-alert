class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|

      t.timestamps
      t.string :name, default: ""
      t.string :url, default: ""
      t.integer :event_number
      t.datetime :event_time_utc
      t.json :last_240_prices, default: []
    end
    add_index :events, :event_number, unique: true
    add_index :events, :name
  end
end
