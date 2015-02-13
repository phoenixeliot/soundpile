SoundPile.Views.PersistentPlayer = Backbone.CompositeView.extend({
  template: JST["player/persistent_player"],

  initialize: function () {
    //TODO: Make sure I'm not over/under-caching files.
    //TODO: Listen for events on the collection/model?
    this.$(".play-btn").hide();
    this.listenTo(this.model, 'pause', this.showPlayButton);
    this.listenTo(this.model, 'play resume', this.showPauseButton);
    this.listenTo(this.model, 'pause', this.showPlayButton);
    this.listenTo(this.model, 'play resume', this.showPauseButton);
  },

  events: {
    "click .play-btn": "play",
    "click .pause-btn": "pause",
    "click .prev-btn": "previous",
    "click .next-btn": "next",
    "click .toggle-repeat": "toggleRepeat",
    "click .toggle-mute": "toggleMute",
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model, referrer_url: this.referrer_url }));
    return this;
  },

  start: function (options) {
    this.referrer_url = options.referrer_url;
    if (options.model === this.model) {
      this.play(); //already on this track, just play it
      return;
    }
    // this.model.audio.pause();
    this.pause();
    this.model = options.model;
    this.render();
    // this.model.audio.play();
    this.play();
  },

  //TODO: Should this be the same function for click handling and code calls?
  play: function (event) {
    event && event.preventDefault();
    if (this.model.audio.play()) {
      // Don't toggle button if there was nothing to play
      this.$(".play-btn").hide();
      this.$(".pause-btn").show();
      this.$(".track-info").addClass("playing");
    }
  },

  pause: function (event) {
    event && event.preventDefault();
    this.model.audio.pause();
    this.$(".play-btn").show();
    this.$(".pause-btn").hide();
    this.$(".track-info").removeClass("playing");
  },

  previous: function (event) {
    event && event.preventDefault();
    //TODO: Manage playlist stuff
    this.model.setPosition(0);
  },

  next: function (event) {
    event && event.preventDefault();
    //TODO: Manage playlist stuff
    console.log("TODO: Implement playlists");
  },

  toggleRepeat: function (event) {
    event && event.preventDefault();
    console.log("TODO: Implement track repeating");
  },

  toggleMute: function (options) {
    event && event.preventDefault();
    this.model.audio.toggleMute();
  },


});
