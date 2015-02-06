json.array! @shares do |share|
  json.partial! 'api/shares/share', share: share, include_user: true
end
