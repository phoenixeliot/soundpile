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
  { username: 'sloslylove', password: 'gggggg' },
  { username: 'guest', password: 'password', display_name: 'Guest' },
])

peter, elliott, sloslylove, guest, _ = users

tracks = Track.create!([
  {
    title: 'Dragonette - Hello (Wind Fish Remix)',
    owner_id: elliott.id,
    audio_file_name: 'sky_palaces.mp3', #might want to rename this
    audio_content_type: "audio/mpeg",
    audio_file_size: 4707575,
    cover_art: File.new("./tmp/art/hello.jpg"),
  },
  {
    title: 'lontalius - i guess itsss (Wind Fish Edit)',
    owner_id: elliott.id,
    audio_file_name: 'i_guess_itsss.mp3',
    audio_content_type: "audio/mpeg",
    audio_file_size: 2784861,
    cover_art: File.new("./tmp/art/i_guess_itsss.jpg"),
  },
  {
    title: 'Airloop',
    owner_id: elliott.id,
    audio_file_name: 'LANDR-airloop.mp3',
    audio_content_type: "audio/mpeg",
    audio_file_size: 5309543,
    cover_art: File.new("./tmp/art/airloop.jpg"),
  },
  {
    title: 'Adelyn Rose - It Means Shadow (Wind Fish Remix)',
    owner_id: elliott.id,
    audio_file_name: 'it_means_shadow.mp3',
    audio_content_type: "audio/mpeg",
    audio_file_size: 4610337,
    cover_art: File.new("./tmp/art/it_means_shadow.jpg"),
  },
  {
    title: 'Concourse Bay Ft. Phoenix',
    owner: elliott,
    audio_file_name: "concourse_bay.mp3",
    audio_content_type: "audio/mpeg",
    audio_file_size: 2226292,
    cover_art: File.new("./tmp/art/concourse_bay.jpg"),
  },
  {
    title: 'Empire Builder',
    owner: elliott,
    audio: File.new("./tmp/audio/empire builder.mp3"),
    cover_art: File.new("./tmp/art/concourse_bay.jpg"),
  },
  {
    title: 'Lonely Bones',
    owner: elliott,
    audio: File.new("./tmp/audio/lonely bones.mp3"),
    cover_art: File.new("./tmp/art/concourse_bay.jpg"),
  },
  {
    title: 'Spacetime',
    owner: elliott,
    audio: File.new("./tmp/audio/spacetime.mp3"),
    cover_art: File.new("./tmp/art/poozer.jpg"),
  },
  {
    title: 'Variation',
    owner: elliott,
    audio: File.new("./tmp/audio/variation.mp3"),
    cover_art: File.new("./tmp/art/poozer.jpg"),
  },
  {
    title: 'Vibrate',
    owner: elliott,
    audio: File.new("./tmp/audio/vibrate.mp3"),
    cover_art: File.new("./tmp/art/poozer.jpg"),
  },
  {
    title: 'Sounds',
    owner: elliott,
    audio: File.new("./tmp/audio/sounds.mp3"),
    cover_art: File.new("./tmp/art/poozer.jpg"),
  },
  {
    title: 'River',
    owner: elliott,
    audio: File.new("./tmp/audio/river.mp3"),
    cover_art: File.new("./tmp/art/poozer.jpg"),
  },
  {
    title: 'Feels',
    owner: sloslylove,
    audio: File.new("./tmp/audio/feels.mp3"),
    cover_art: File.new("./tmp/art/the_haunted.jpg"),
  },
  {
    title: "Can't Let Go",
    owner: sloslylove,
    audio: File.new("./tmp/audio/cant_let_go.mp3"),
    cover_art: File.new("./tmp/art/the_haunted.jpg"),
  },
  {
    title: 'You And I',
    owner: sloslylove,
    audio: File.new("./tmp/audio/you_and_i.mp3"),
    cover_art: File.new("./tmp/art/the_haunted.jpg"),
  },
  ])

shares = Share.create!([
  {
    owner: peter,
    track: tracks[0]
  },
  {
    owner: peter,
    track: tracks[1]
  },
])

likes = Like.create!([
  {
    user: peter,
    track: tracks[0]
  },
  {
    user: peter,
    track: tracks[1]
  },
  {
    user: peter,
    track: tracks[2]
  },
  {
    user: guest,
    track: tracks[0]
  },
  {
    user: guest,
    track: tracks[1]
  },
  {
    user: sloslylove,
    track: tracks[1]
  },
  {
    user: sloslylove,
    track: tracks[3]
  },
])
