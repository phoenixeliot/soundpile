SoundPile.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',

  initialize: function (attributes, options) {
    if (typeof options === "undefined") {
      //Create placeholders for when player has a null track
      this.audio = new Audio();
    }
    //stub data for waveform
    this.set("peakData", []);
    for (var i = 0; i < 192; i++) {
      this.get("peakData")[i] = (Math.random() * 28) + 8;
    }
  },

  parse: function (payload) {
    if (payload.current_user_like) {
      this.current_user_like = new SoundPile.Models.Like(payload.current_user_like);
      delete payload.current_user_like;
    } else {
      this.current_user_like = null;
    }
    if (payload.current_user_share) {
      this.current_user_share = new SoundPile.Models.Share(payload.current_user_share);
      delete payload.current_user_share;
    } else {
      this.current_user_share = null;
    }
    if (payload.audio_url) {
      //TODO: Remove global
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

  fractionPlayed: function () {
    return this.position() / this.duration();
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

  addLike: function () {
    var like = new SoundPile.Models.Like({
      user_id: SoundPile.current_user.id,
      track_id: this.id
    });
    this.current_user_like = like;
    like.save({}, {
      success: function (like) {
      }.bind(this),
      error: function (like) {
        this.set("num_likes", this.get("num_likes") - 1);
        this.current_user_like = null;
        this.trigger("like:remove");
      }.bind(this),
    });
    this.set("num_likes", this.get("num_likes") + 1);
    this.trigger("like:add");
  },

  removeLike: function () {
    var like = this.current_user_like;
    this.current_user_like = null;
    like.destroy({
      success: function (like) {
      }.bind(this),
      error: function (like) {
        this.set("num_likes", this.get("num_likes") + 1);
        this.current_user_like = like;
        this.trigger("like:add");
      }.bind(this),
    });
    this.set("num_likes", this.get("num_likes") - 1);
    this.trigger("like:remove");
  },

  addShare: function () {
    var share = new SoundPile.Models.Share({
      owner_id: SoundPile.current_user.id,
      track_id: this.id
    });
    this.current_user_share = share;
    share.save({}, {
      success: function (share) {
      }.bind(this),
      error: function (share) {
        this.set("num_shares", this.get("num_shares") - 1);
        this.current_user_share = null;
        this.trigger("share:remove");
      }.bind(this),
    });
    this.set("num_shares", this.get("num_shares") + 1);
    this.trigger("share:add");
  },

  removeShare: function () {
    var share = this.current_user_share;
    this.current_user_share = null;
    share.destroy({
      success: function (share) {
      }.bind(this),
      error: function (share) {
        this.set("num_shares", this.get("num_shares") + 1);
        this.current_user_share = share;
        this.trigger("share:add");
      }.bind(this),
    });
    this.set("num_shares", this.get("num_shares") - 1);
    this.trigger("share:remove");
  },
});
