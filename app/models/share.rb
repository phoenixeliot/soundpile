class Share < ActiveRecord::Base
  belongs_to :track
  belongs_to :owner, class_name: 'User'
end
