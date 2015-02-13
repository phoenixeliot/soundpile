if @include_id
  json.id @user.id
end
json.display_name @user.display_name
json.username @user.username
if @include_shares
  json.shares do
    json.array! @user.shares.order(created_at: :desc) do |share|
      json.partial! 'api/shares/share', share: share, include_user: false
    end
  end
end
