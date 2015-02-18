SoundPile.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  parse: function (payload) {
    if (payload.track) {
      this.set({
        track: SoundPile.tracks.getOrCreate(payload.track, { parse: true })
      });
    }

    delete payload.track;
    return payload;
  },
});
