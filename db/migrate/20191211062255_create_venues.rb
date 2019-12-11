class CreateVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :venues do |t|

      t.timestamps
      t.string :slug
      t.string :name
      t.string :url
      t.string :address
      t.string :city
      t.string :state
      t.string :timezone
      t.integer :postal_code
      t.integer :venue_number

    end

    add_index :venues, :venue_number, unique: true

  end
end
