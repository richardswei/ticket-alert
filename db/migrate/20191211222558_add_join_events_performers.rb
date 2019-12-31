class AddJoinEventsPerformers < ActiveRecord::Migration[5.2]
  def change
    create_table :events_performers, id: false do |t|
      t.belongs_to :event
      t.belongs_to :performer
    end
  end
end
