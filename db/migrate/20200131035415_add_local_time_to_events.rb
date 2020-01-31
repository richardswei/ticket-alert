class AddLocalTimeToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :local_start_time, :datetime
  end
end
