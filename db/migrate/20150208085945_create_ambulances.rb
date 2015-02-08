class CreateAmbulances < ActiveRecord::Migration
  def change
    create_table :ambulances do |t|
      t.integer :seq_id
      t.string :site_type
      t.string :name
      t.string :address
      t.string :phone
      t.float :lat
      t.float :lng
      t.integer :number
      t.string :car_id

      t.timestamps
    end
  end
end
