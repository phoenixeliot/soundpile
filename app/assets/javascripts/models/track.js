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
      var audio = this.audio = soundManager.createSound({
        id: payload.id,
        url: payload.audio_url,
        whileplaying: function (audio) {
          this.trigger("position:change");
        }.bind(this),
        whileloading: function (audio) {
          this.trigger("load:change");
        }.bind(this),
      });

      // this.audio._a.addEventListener('stalled', function() {
      //   if (!audio) return;
      //   // var audio = this;
      //   audio.load();
      //   audio.play();
      // });

    }
    return payload;
  },

  position: function () {
    return this.audio.position;
  },

  fractionLoaded: function () {
    if (!this.audio) {
      return 0;
    }
    return this.audio.bytesLoaded / this.audio.bytesTotal;
  },

  percentLoaded: function (options) {
    return (this.fractionLoaded() * 100) + "%";
  },

  duration: function () {
    //TODO: Return this in the JSON?
    return this.audio.durationEstimate;
  },

  setPosition: function (pos) {
    this.audio.setPosition(pos);
    this.trigger("position:change");
  },
});
