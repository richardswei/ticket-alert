class CreatePerformers < ActiveRecord::Migration[5.2]
  def change
    create_table :performers do |t|

      t.timestamps
      t.datetime :event_start
      t.string :performer_url
      

    end
  end
end
