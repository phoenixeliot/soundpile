class Track < ActiveRecord::Base
  validates :owner_id, :title, :artist, presence: true

  after_initialize :ensure_artist_name
  belongs_to :owner, class_name: 'User'

  private
    def ensure_artist_name
      self.artist ||= self.owner.display_name
    end
end
