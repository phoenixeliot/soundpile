SoundPile.Collections.Posts = Backbone.Collection.extend({
  model: SoundPile.Models.Post,

  url: '/api/posts',
});
