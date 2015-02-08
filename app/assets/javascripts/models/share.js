SoundPile.Models.Share = Backbone.Model.extend({
  urlRoot: '/api/shares',

  parse: function (payload) {
    if (payload.track) {
      this.set({
        track: new SoundPile.Models.Track(payload.track, { parse: true })
      });
    }

    delete payload.track;
    return payload;
  },
});
