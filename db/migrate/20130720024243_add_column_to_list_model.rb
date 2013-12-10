class AddColumnToListModel < ActiveRecord::Migration
  def change
    change_table :lists do |t|
      t.string :priority
    end
  end
end
