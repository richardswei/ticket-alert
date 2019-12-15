class AddLastPriceToEvents < ActiveRecord::Migration[5.2]
  def change
    change_table(:events) do |t|
      t.integer :last_price
    end
  end
end
