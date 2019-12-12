class AddEventsReferences < ActiveRecord::Migration[5.2]
  def change
    change_table(:events) do |t|
      t.belongs_to :venues
    end
  end
end
