class AddStatusToAmbulances < ActiveRecord::Migration
  def change
    add_column :ambulances, :status, :text
  end
end
