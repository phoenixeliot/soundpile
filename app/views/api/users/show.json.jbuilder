json.display_name @user.display_name
json.username @user.username
json.shares do
  json.array! @user.shares do |share|
    json.partial! 'api/shares/share', share: share, include_user: false
  end
end
