### Phase 4: Liking and Reblogging Songs (~1 day)
I plan on adding 'like' and 'reblog' buttons to the player, as well as add a
page to list songs that a user has liked. This will be similar to viewing a
user's profile to view their reblogged songs.

# Phase 4: User Feeds

## Rails
### Models
Like
Post

### Controllers
LikesController
Api::LikesController
PostsController
Api::PostsController

### Views
song_show.jbuilder - add like/post count

## Backbone
### Models
Song - add like count/current user like boolean

### Collections

### Views
* SongIndexItem update

## Gems/Libraries
