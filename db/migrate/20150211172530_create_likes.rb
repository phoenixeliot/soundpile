class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_id,  null: false, index: true
      t.integer :track_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
