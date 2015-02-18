class Post < ActiveRecord::Base
  validates :track_id, :owner_id, presence: true
  belongs_to :track
  belongs_to :owner, class_name: 'User'
end
