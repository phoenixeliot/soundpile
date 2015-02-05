SoundPile.Collections.Tracks = Backbone.Collection.extend({
  url: '/api/tracks',
  model: SoundPile.Models.Track
});
