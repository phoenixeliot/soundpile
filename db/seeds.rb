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

peter, elliott, _ = User.all.to_a

tracks = Track.create!([
  { title: 'Dragonette - Hello (Wind Fish Remix)', owner_id: elliott.id }
])
