# SoundPile

[Heroku link][heroku]

[heroku]: http://soundpile.herokuapp.com

## Minimum Viable Product
SoundPile is a clone of SoundCloud built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] View songs individually
- [x] Play songs (with ajax player)
- [x] Make song listing into a player that syncs with persistent player
- [x] View index of all songs
- [ ] Share songs
- [x] View another user's shared songs
- [ ] Like songs
- [ ] View liked songs

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/wireframes.jpg
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to log in, but will
not yet be able to interact with songs. I will include a basic navbar header.
The most important part of this phase will be pushing the app to Heroku and
ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Viewing Songs and Profiles (~2 days)
I will add API routes to serve profile and song data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to view songs alone or on a user's profile page, and
play them with a barebones embedded mp3. I will use Amazon S3 to store the audio
files.

[Details][phase-two]

### Phase 3: Persistent Player (~2 days)
I plan on creating a persistent player view which will remain on the page even
when clicking any links, without interrupting playback. At this stage the player
will have only play and pause functionality. I will be using SoundManager2 for
audio playback.

[Details][phase-three]

### Phase 4: Liking and Reblogging Songs (~1 day)
I plan on adding 'like' and 'reblog' buttons to the player, as well as add a
page to list songs that a user has liked. This will be similar to viewing a
user's profile to view their reblogged songs.

[Details][phase-four]

### Phase 5: Fancy Player (~2 days)
I will add playlist functionality to the player -- If you start playing a song
from a page with multiple songs, it will automatically load the next song from
that list when the previous song ends. I also plan on adding a link in the
persistent player to zoom to the part of the page where you started playing
music.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Typeahead search bar
- [ ] Keyboard controls
- [ ] Follow users to see their posted songs in your stream
- [ ] Like/reblog/play counts on song listings
- [ ] Multiple sessions/session management
- [ ] User avatars, album art
- [ ] Song/artist search

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
