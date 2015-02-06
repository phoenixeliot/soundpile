SoundPile.Models.Share = Backbone.Model.extend({
  urlRoot: '/api/shares',

  parse: function (payload) {
    if (payload.track) {
      this.track().set(payload.track, { parse: true });
    }

    delete payload.track;
    return payload;
  },

  track: function () {
    if(!this._track) {
      this._track = new SoundPile.Models.Track();
    }
    return this._track;
  }

});
