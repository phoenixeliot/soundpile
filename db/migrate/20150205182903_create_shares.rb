class CreateShares < ActiveRecord::Migration
  def change
    create_table :shares do |t|
      t.integer :track_id
      t.integer :owner_id

      t.timestamps null: false
    end
  end
end
