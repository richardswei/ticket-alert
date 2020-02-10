class AddDailyPricesToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :daily_prices, :json, default: []
  end
end
