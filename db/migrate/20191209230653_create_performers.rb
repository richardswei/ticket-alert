class CreatePerformers < ActiveRecord::Migration[5.2]
  def change
    create_table :performers do |t|

      t.timestamps
      t.string :performer_url
      t.string :name
      t.string :slug
      t.integer :performer_id
      t.integer :venue_id

    end
    add_index :performers, :performer_id, unique: true
  end
end
