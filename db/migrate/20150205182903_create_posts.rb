class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :track_id
      t.integer :owner_id

      t.timestamps null: false
    end
  end
end
