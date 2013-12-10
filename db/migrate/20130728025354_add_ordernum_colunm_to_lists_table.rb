class AddOrdernumColunmToListsTable < ActiveRecord::Migration
  def change
    change_table :lists do |t|
      t.integer :order_num
    end
  end
end
