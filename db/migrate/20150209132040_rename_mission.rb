class RenameMission < ActiveRecord::Migration
  def change
    rename_column :missions, :strucure, :structure
  end
end
