class CreateShelters < ActiveRecord::Migration
  def change
    create_table :shelters do |t|
      t.string :uid
      t.string :name
      t.string :city
      t.string :state
      t.string :address
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
