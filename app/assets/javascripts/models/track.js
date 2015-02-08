SoundPile.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',

  initialize: function (options) {
    if (typeof options === "undefined") {
      //Create placeholders for when player has a null track
      this.audio = new Audio();
    }
  },

  parse: function (payload) {
    if (payload.audio_url) {
      this.audio = soundManager.createSound({
        id: payload.id,
        url: payload.audio_url
      });
      console.log(this.audio);
    }
    return payload;
  },
});
