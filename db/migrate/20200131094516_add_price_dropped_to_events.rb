class AddPriceDroppedToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :dropped, :boolean, default: false
  end
end
