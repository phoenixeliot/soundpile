class Track < ActiveRecord::Base
  validates :owner_id, :title, :artist, presence: true

  has_attached_file :audio
  validates_attachment_content_type :audio,
        content_type: %w[audio/mpeg audio/ogg audio/webm audio/x-aiff audio/aiff application/octet-stream]

  has_attached_file :cover_art
  validates_attachment_content_type :cover_art,
        content_type: %w[image/gif image/jpeg image/png]

  after_initialize :ensure_artist_name
  belongs_to :owner, class_name: 'User'
  has_many :shares

  has_many :likes
  has_many :likers, through: :likes, source: :user #Might want to rename this

  def liked_by? user
    !self.likes.where(user_id: user.id).empty?
  end

  private
    def ensure_artist_name
      self.artist ||= self.owner.display_name
    end
end
