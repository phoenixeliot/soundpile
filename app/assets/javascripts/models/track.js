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
        url: payload.audio_url,
        whileplaying: function (audio) {
          this.trigger("position:change");
        }.bind(this),
      });
    }
    return payload;
  },

  position: function () {
    return this.audio.position;
  },

  duration: function () {
    //TODO: Return this in the JSON?
    return this.audio.durationEstimate;
  },
});
