class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :owner_id, null: false
      t.string :title,     null: false, index: true
      t.string :artist,    null: false

      t.timestamps null: false
    end
  end
end
