class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|

      t.timestamps
      t.string :event_name, default: ""
      t.integer :price_curr, default: 0
      t.integer :price_t0, default: 0
      t.integer :price_t1, default: 0
      t.integer :price_t2, default: 0
      t.integer :price_t3, default: 0
      t.integer :price_t4, default: 0
      t.integer :price_t5, default: 0
      t.integer :price_t6, default: 0
      t.integer :price_t30, default: 0
      t.string :event_url, default: ""


    end
  end
end
