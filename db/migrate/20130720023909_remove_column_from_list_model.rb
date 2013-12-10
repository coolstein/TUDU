class RemoveColumnFromListModel < ActiveRecord::Migration
  def change
    remove_column :lists, :priority
  end
end
