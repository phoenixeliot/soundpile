SoundPile.Views.PersistentPlayer = Backbone.CompositeView.extend({
  template: JST["player/persistent_player"],

  initialize: function () {
    //TODO: Make sure I'm not over/under-caching files.
    //TODO: Listen for events on the collection/model?
    this.$(".play-btn").hide();
  },

  events: {
    "click .play-btn": "play",
    "click .pause-btn": "pause",
    "click .prev-btn": "previous",
    "click .next-btn": "next",
    "click .toggle-repeat": "toggleRepeat",
    "click .toggle-mute": "toggleMute",
  },

  setupListeners: function () {
    this.stopListening();

    this.listenTo(this.model, 'position:change', this.renderPosition);
    this.listenTo(this.model, 'load:change', this.renderLoading);
    this.listenTo(this.model, 'pause', this.showPlayButton);
    this.listenTo(this.model, 'play resume', this.showPauseButton);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model, referrer_url: this.referrer_url }));
    return this;
  },

  renderPosition: function () {
    console.log("persistent event");
    var fractionalPosition = this.model.position() / this.model.duration();
    var percentPosition = (fractionalPosition * 100) + "%";
    this.$(".position-bar").css("width", percentPosition);
    console.log(percentPosition);
  },

  renderLoading: function () {
    this.$(".position-bar-loading").css("width", this.model.percentLoaded());
  },

  start: function (options) {
    this.referrer_url = options.referrer_url;
    if (options.model === this.model) {
      this.play(); //already on this track, just play it
      return;
    }
    // this.model.audio.pause();
    this.pause();
    this.replaceModel(options.model);
    this.render();
    // this.model.audio.play();
    this.play();
  },

  replaceModel: function (model) {
    this.model = model;
    this.setupListeners();
  },

  //TODO: Should this be the same function for click handling and code calls?
  play: function (event) {
    if (event) event.preventDefault();
    if (this.model.audio.play()) {
      // Don't toggle button if there was nothing to play
      this.$(".play-btn").hide();
      this.$(".pause-btn").show();
      this.$(".track-info").addClass("playing");
    }
  },

  pause: function (event) {
    if (event) event.preventDefault();
    this.model.audio.pause();
    this.$(".play-btn").show();
    this.$(".pause-btn").hide();
    this.$(".track-info").removeClass("playing");
  },

  previous: function (event) {
    if (event) event.preventDefault();
    //TODO: Manage playlist stuff
    this.model.setPosition(0);
  },

  next: function (event) {
    if (event) event.preventDefault();
    //TODO: Manage playlist stuff
    console.log("TODO: Implement playlists");
  },

  toggleRepeat: function (event) {
    if (event) event.preventDefault();
    console.log("TODO: Implement track repeating");
  },

  toggleMute: function (options) {
    if (event) event.preventDefault();
    this.model.audio.toggleMute();
  },

});
