class Like < ActiveRecord::Base
  validates :track_id, uniqueness: { scope: :user_id }
  belongs_to :user
  belongs_to :track
end
