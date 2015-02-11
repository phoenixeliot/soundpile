json.id @user.id if @include_id
json.display_name @user.display_name
json.username @user.username
if @include_shares
  json.shares do
    json.array! @user.shares do |share|
      json.partial! 'api/shares/share', share: share, include_user: false
    end
  end
end
