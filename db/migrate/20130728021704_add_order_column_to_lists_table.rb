class AddOrderColumnToListsTable < ActiveRecord::Migration
  def change
    change_table :lists do |t|
      t.integer :order
    end
  end
end
