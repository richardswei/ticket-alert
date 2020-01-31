class AddColorsToPerformers < ActiveRecord::Migration[5.2]
  def change
    add_column :performers, :colors, :string, array: true, default: []
  end
end
