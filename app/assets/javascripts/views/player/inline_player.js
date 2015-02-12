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
    "click .position-bar-container": "seek",
    "mousedown .position-bar-container": "startDrag",
    "mouseup .position-bar-container": "stopDrag",
    "mouseleave .position-bar-container": "stopDrag",
    "mousemove .position-bar-container": "seekIfDragging",
  },

  initialize: function () {
    this.listenTo(this.model, 'position:change', this.renderPosition);
    this.listenTo(this.model, 'load:change', this.renderLoading);
    this.listenTo(this.model, 'pause', this.showPlayButton);
    this.listenTo(this.model, 'play resume', this.showPauseButton);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    this.renderPosition();
    this.renderLoading();
    this.renderWaveform();
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

  renderWaveform: function () {
    var canvas = this.$("canvas")[0];
    var ctx = canvas.getContext("2d");

    //stub data
    //max: 46
    var data = [32,31,42,39,28,27,38,22,8,24,2,41,9,18,20,5,42,24,23,43,7,17,8,7,42,33,40,7,20,18,3,2,21,1,29,14,6,45,15,5,1,16,2,24,28,25,22,2,40,2,14,43,33,45,18,10,21,36,24,14,12,25,2,5,44,34,33,25,2,37,7,10,9,45,7,32,21,41,33,6,26,32,45,25,10,20,14,35,25,34,7,35,21,29,33,11,3,29,19,38,43,14,24,13,36,25,0,35,28,25,40,38,16,28,18,43,24,2,28,33,7,19,30,14,21,30,18,15,35,45,34,13,22,38,28,11,9,40,8,28,28,6,18,43,19,12,7,12,28,0,18,32,1,14,1,41,12,37,45,16,17,40,9,9,9,45,17,9,7,38,27,34,8,23,13,2,18,24,11,23,43,19,37,9,6,17,19,45,15,20,27,30,27,18,37,35];
    // var data = [32,31,42,39];

    ctx.fillStyle = "rgba(51,51,51)";

    $(data).each(function (i, height) {
      console.log(height, i);
      ctx.fillRect (i*3, (46-height), 2, height);
    });
  },

  play: function (event) {
    event.preventDefault();
    SoundPile.player.start({
      model: this.model,
      //collection: the playlist for the page
    });
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
    var totalWidth = this.$(".position-bar-container").width();
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
