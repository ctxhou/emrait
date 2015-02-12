class AddColToShelterInfos < ActiveRecord::Migration
  def change
    add_column :shelter_infos, :name, :text
    add_column :shelter_infos, :content, :text
    add_column :shelter_infos, :shelter_id, :integer
  end
end
