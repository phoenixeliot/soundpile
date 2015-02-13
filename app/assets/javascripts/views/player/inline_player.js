/*
This view doesn't actually play anything--it offloads most of the work to the
PersistentPlayer/model, and updates its own status based on events from the
PersistentPlayer. Clicking on this tells the model to update itself (eg, to seek
to a new position or play/pause)
*/

SoundPile.Views.InlinePlayer = Backbone.CompositeView.extend({
  template: JST["player/inline_player"],

  events: {
    "click .play-track": "play",
    "click .pause-track": "pause",

    "mousedown canvas": "startDrag",
    "mouseup canvas": "stopDrag",
    "mouseleave canvas": "stopDrag",
    "mousemove canvas": "seekIfDragging",
  },

  initialize: function () {
    this.listenTo(this.model, 'position:change', this.renderPosition);
    this.listenTo(this.model, 'load:change', this.renderLoading);
    this.listenTo(this.model, 'pause', this.showPlayButton);
    this.listenTo(this.model, 'play resume', this.showPauseButton);

    var waveformView = new SoundPile.Views.Waveform({ model: this.model });
    this.addSubview(".waveform", waveformView);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    this.renderPosition();
    this.renderLoading();
    this.attachSubviews();
    return this;
  },

  renderPosition: function () {
    var fractionalPosition = this.model.position() / this.model.duration();
    var percentPosition = (fractionalPosition * 100) + "%";
    this.$(".position-bar").css("width", percentPosition);
  },

  renderLoading: function () {
    this.$(".position-bar-loading").css("width", this.model.percentLoaded());
  },

  play: function (event) {
    event && event.preventDefault();
    if(this.model === SoundPile.player.model) {
      SoundPile.player.play();
    } else {
      SoundPile.player.start({
        model: this.model,
        referrer_url: "#/" + Backbone.history.fragment,
        //collection: the playlist for the page
      });
    }
  },

  showPauseButton: function (event) {
    this.$(".play-track").hide();
    this.$(".pause-track").show();
  },

  pause: function (event) {
    event.preventDefault();
    this.showPlayButton();
    SoundPile.player.pause();
  },

  showPlayButton: function (event) {
    this.$(".pause-track").hide();
    this.$(".play-track").show();
  },

  seek: function (event) {
    var totalWidth = this.$(".waveform").width();
    var offsetX  = (event.offsetX || event.clientX - $(event.target).offset().left);
    var percentage = offsetX / totalWidth;
    var position = percentage * this.model.duration();
    this.model.setPosition(position);
  },

  startDrag: function (event) {
    this.dragging = true;
  },

  stopDrag: function (event) {
    if (this.dragging) {
      this.dragging = false;
      this.seek(event);
    }
  },

  seekIfDragging: function (event) {
    if (this.dragging) {
      this.seek(event);
    }
  },
});
