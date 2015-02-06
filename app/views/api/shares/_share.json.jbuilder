json.id share.id

json.is_reshared (share.track.owner_id != share.owner_id)
# if include_user
  json.owner_name share.owner.display_name
  json.owner_id share.owner_id
# end

json.track do
  json.partial! 'api/tracks/track', track: share.track
end
# TODO: reduce redundancy
