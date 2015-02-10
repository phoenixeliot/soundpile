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
    "click .position-bar-container": "seek",
    "mousedown .position-bar-container": "startDrag",
    "mouseup .position-bar-container": "stopDrag",
    "mouseleave .position-bar-container": "stopDrag",
    "mousemove .position-bar-container": "seekIfDragging",
  },

  initialize: function () {
    this.listenTo(this.model, 'position:change', this.renderPosition);
    this.listenTo(this.model, 'load:change', this.renderLoading);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },

  renderPosition: function () {
    var fractionalPosition = this.model.position() / this.model.duration();
    var percentPosition = (fractionalPosition * 100) + "%";
    console.log("Position: " + percentPosition);
    this.$(".position-bar").css("width", percentPosition);
  },

  renderLoading: function () {
    var fractionalPosition = this.model.durationLoaded() / this.model.duration();
    // var fractionalPosition = this.model.audio.bytesLoaded() / this.model.audio.bytesTotal();
    var percentPosition = (fractionalPosition * 100) + "%";
    console.log("Loading: " + percentPosition);
    this.$(".position-bar-loading").css("width", percentPosition);
  },

  play: function (event) {
    event.preventDefault();
    SoundPile.player.start({
      model: this.model,
      //collection: the playlist for the page
    });
  },

  seek: function (event) {
    var totalWidth = this.$(".position-bar-container").width();
    var percentage = event.offsetX / totalWidth;
    var position = percentage * this.model.duration();
    this.model.setPosition(position);
    console.log("seek");
  },

  startDrag: function (event) {
    this.dragging = true;
    console.log("dragging");
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
