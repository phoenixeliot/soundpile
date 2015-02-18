json.id track.id
json.owner_id track.owner_id
# track.artist == track.owner.display_name
json.title track.title
json.artist track.artist
json.audio_url track.audio.url
json.cover_art_url track.cover_art.url
json.num_likes track.likes.count
json.num_posts track.posts.count
json.current_user_like track.likes.find_by(user: current_user)
json.current_user_post track.posts.find_by(owner: current_user)
