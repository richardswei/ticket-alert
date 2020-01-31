class AddDivisionToPerformers < ActiveRecord::Migration[5.2]
  def change
    add_column :performers, :division, :string, array: true, default: [] 
  end
end