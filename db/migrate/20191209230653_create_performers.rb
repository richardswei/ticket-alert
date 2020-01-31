class CreatePerformers < ActiveRecord::Migration[5.2]
  def change
    create_table :performers do |t|

      t.timestamps
      t.string :url, default: ""
      t.string :name, default: ""
      t.string :slug, default: ""
      t.integer :performer_number
      t.integer :home_venue_number
    end
    add_index :performers, :performer_number, unique: true
    add_index :performers, :name, unique: true
  end
end
