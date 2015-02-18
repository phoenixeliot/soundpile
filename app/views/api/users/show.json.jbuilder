if @include_id
  json.id @user.id
end
json.display_name @user.display_name
json.username @user.username
if @include_posts
  json.posts do
    json.array! @user.posts.order(created_at: :desc) do |post|
      json.partial! 'api/posts/post', post: post, include_user: false
    end
  end
end
