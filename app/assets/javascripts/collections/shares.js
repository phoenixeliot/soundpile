SoundPile.Collections.Shares = Backbone.Collection.extend({
  model: SoundPile.Models.Share,

  url: '/api/shares',
});
