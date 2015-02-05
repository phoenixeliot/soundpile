class Track < ActiveRecord::Base
  validates :owner_id, :title, :artist, presence: true

  after_initialize :ensure_artist_name
  belongs_to :owner, class_name: 'User'

  has_attached_file :audio
  validates_attachment_content_type :audio,
        content_type: %w[audio/mpeg audio/ogg audio/webm]



  private
    def ensure_artist_name
      self.artist ||= self.owner.display_name
    end
end
