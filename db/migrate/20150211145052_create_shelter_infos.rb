class CreateShelterInfos < ActiveRecord::Migration
  def change
    create_table :shelter_infos do |t|

      t.timestamps
    end
  end
end
