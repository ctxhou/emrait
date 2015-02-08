class AddStatusToMissions < ActiveRecord::Migration
  def change
    add_column :missions, :status, :text
  end
end
