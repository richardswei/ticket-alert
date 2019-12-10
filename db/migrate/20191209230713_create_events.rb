class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|

      t.timestamps
      t.string :event_name, default: ""
      t.string :event_url, default: ""
      t.integer :event_id
      t.integer :price_curr, default: 0
      t.string :price_t30, array: true, default: []

    end
    add_index :events, :event_id, unique: true
  end
end
