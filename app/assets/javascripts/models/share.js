SoundPile.Models.Share = Backbone.Model.extend({
  urlRoot: '/api/shares',

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
