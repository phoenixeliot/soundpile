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
      audio = this.audio = soundManager.createSound({
        id: payload.id,
        url: payload.audio_url,
        whileplaying: function () {
          this.trigger("position:change");
        }.bind(this),
        whileloading: function () {
          this.trigger("load:change");
        }.bind(this),
        onpause: function () {
          this.trigger("pause");
        }.bind(this),
        onplay: function () {
          this.trigger("play");
        }.bind(this),
        onresume: function () {
          this.trigger("resume");
        }.bind(this),
        onfinish: function () {
          this.trigger("finish");
        }.bind(this),
      });
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
    //Warning! These values are misleading, and don't match SM2's documentation.
    //bytesLoaded is really a fraction, and bytesTotal is really 1.
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
