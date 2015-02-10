class AddStrucureToMissions < ActiveRecord::Migration
  def change
    add_column :missions, :strucure, :text
  end
end
