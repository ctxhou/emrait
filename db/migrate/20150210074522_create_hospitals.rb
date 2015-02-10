class CreateHospitals < ActiveRecord::Migration
  def change
    create_table :hospitals do |t|
      t.string :hospital_id
      t.text :name
      t.text :address
      t.float :lat
      t.float :lng
      t.string :report_full
      t.integer :wait_see
      t.integer :wait_push_bed
      t.integer :wait_bed
      t.integer :wait_cure_bed

      t.timestamps
    end
  end
end
