class CreateMissions < ActiveRecord::Migration
  def change
    create_table :missions do |t|
      t.integer :seq_id
      t.string :start_lat
      t.string :start_lng
      t.string :end_lat
      t.string :end_lng
      t.string :processing_time
      t.string :hospital

      t.timestamps
    end
  end
end
