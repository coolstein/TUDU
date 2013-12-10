class RemoveOrderColumnFromListsTable < ActiveRecord::Migration
  def change
    remove_column :lists, :order, :integer
  end
end
