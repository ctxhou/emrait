class NewColToMission < ActiveRecord::Migration
  def change
    add_column :missions, :disaster_time, :text
    add_column :missions, :hospital_time, :text
  end
end
