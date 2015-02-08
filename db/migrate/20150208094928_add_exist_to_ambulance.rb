class AddExistToAmbulance < ActiveRecord::Migration
  def change
     add_column :ambulances, :exist, :integer
  end
end
