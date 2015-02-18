# Phase 2: Viewing Songs and Profiles

## Rails
### Models
* Songs
* Posts (has one song, used for uploads or reblogs)

### Controllers
* Api::SongsController (show, index, posted(user))

### Views
* songs/show.json.jbuilder
* songs/index.json.jbuilder
* songs/posted.json.jbuilder

## Backbone
### Models
* User
* Post
* Song

### Collections
* Posts

### Views
* UserShow (composite view, contains SongItem/FavesPartial subview)
* SongIndex (composite view, contains SongIndexItem subviews)
* SongIndexItem
* SongShow

## Gems/Libraries
paperclip
aws-sdk
figaro
