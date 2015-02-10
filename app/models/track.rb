class Track < ActiveRecord::Base
  validates :owner_id, :title, :artist, presence: true

  after_initialize :ensure_artist_name
  belongs_to :owner, class_name: 'User'
  has_many :shares

  has_attached_file :audio
  validates_attachment_content_type :audio,
        content_type: %w[audio/mpeg audio/ogg audio/webm audio/x-aiff audio/aiff application/octet-stream]

  has_attached_file :cover_art
  validates_attachment_content_type :cover_art,
        content_type: %w[image/gif image/jpeg image/png]

  private
    def ensure_artist_name
      self.artist ||= self.owner.display_name
    end
end
