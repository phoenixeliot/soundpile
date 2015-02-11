class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :owned_tracks, class_name: 'Track', foreign_key: :owner_id
  has_many :shares, foreign_key: :owner_id
  has_many :shared_tracks, through: :shares, source: :track

  has_many :likes
  has_many :liked_tracks, through: :likes, source: :track

  attr_reader :password

  after_initialize :ensure_session_token
  after_initialize :ensure_display_name

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password= password
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password? password
    BCrypt::Password.new(password_digest).is_password? password
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def ensure_display_name
    self.display_name ||= self.username
  end
end
