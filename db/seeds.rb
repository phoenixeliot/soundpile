# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create!([
  { username: 'peter', password: 'eeeeee', display_name: 'Felix' },
  { username: 'elliott', password: 'ffffff', display_name: 'Wind Fish' },
])

peter, elliott, _ = users

tracks = Track.create!([
  {
    title: 'Dragonette - Hello (Wind Fish Remix)',
    owner_id: elliott.id,
    audio_file_name: 'sky_palaces.mp3', #might want to rename this
    audio_content_type: "audio/mpeg",
    audio_file_size: 4707575
  },
  {
    title: 'lontalius - i guess itsss (Wind Fish Edit)',
    owner_id: elliott.id,
    audio_file_name: 'i_guess_itsss.mp3',
    audio_content_type: "audio/mpeg",
    audio_file_size: 2784861
  },
  {
    title: 'Airloop',
    owner_id: elliott.id,
    audio_file_name: 'LANDR-airloop.mp3',
    audio_content_type: "audio/mpeg",
    audio_file_size: 5309543
  },
  {
    title: 'Adelyn Rose - It Means Shadow (Wind Fish Remix)',
    owner_id: elliott.id,
    audio_file_name: 'it_means_shadow.mp3',
    audio_content_type: "audio/mpeg",
    audio_file_size: 4610337
  }
])

shares = Share.create!([
  {
    owner: elliott,
    track: tracks[1]
  },
  {
    owner: elliott,
    track: tracks[2]
  },
  {
    owner: elliott,
    track: tracks[3]
  },
])
