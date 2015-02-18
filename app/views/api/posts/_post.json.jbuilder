json.id post.id

json.is_reposted (post.track.owner_id != post.owner_id)
# if include_user
  json.owner_name post.owner.display_name
  json.owner_id post.owner_id
# end

json.track do
  json.partial! 'api/tracks/track', track: post.track
end
# TODO: reduce redundancy
