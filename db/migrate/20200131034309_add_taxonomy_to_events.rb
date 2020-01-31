class AddTaxonomyToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :taxonomy, :string
  end
end
