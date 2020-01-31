class AddTaxonomyToPerformers < ActiveRecord::Migration[5.2]
  def change
    add_column :performers, :taxonomy, :string
  end
end
