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
    if (payload.current_user_post) {
      this.current_user_post = new SoundPile.Models.Post(payload.current_user_post);
      delete payload.current_user_post;
    } else {
      this.current_user_post = null;
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

  addPost: function () {
    var post = new SoundPile.Models.Post({
      owner_id: SoundPile.current_user.id,
      track_id: this.id
    });
    this.current_user_post = post;
    post.save({}, {
      success: function (post) {
      }.bind(this),
      error: function (post) {
        this.set("num_posts", this.get("num_posts") - 1);
        this.current_user_post = null;
        this.trigger("post:remove");
      }.bind(this),
    });
    this.set("num_posts", this.get("num_posts") + 1);
    this.trigger("post:add");
  },

  removePost: function () {
    var post = this.current_user_post;
    this.current_user_post = null;
    post.destroy({
      success: function (post) {
      }.bind(this),
      error: function (post) {
        this.set("num_posts", this.get("num_posts") + 1);
        this.current_user_post = post;
        this.trigger("post:add");
      }.bind(this),
    });
    this.set("num_posts", this.get("num_posts") - 1);
    this.trigger("post:remove");
  },
});
