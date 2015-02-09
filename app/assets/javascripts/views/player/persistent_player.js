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
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },

  start: function (options) {
    if (options.model === this.model) {
      return; //already playing this track, nothing to do
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
    this.$(".play-btn").hide();
    this.$(".pause-btn").show();
    this.model.audio.play();
  },

  pause: function (event) {
    event && event.preventDefault();
    this.$(".play-btn").show();
    this.$(".pause-btn").hide();
    this.model.audio.pause();
  },

  previous: function (event) {
    console.log("TODO: Do something!");
  },

  next: function (event) {
    console.log("TODO: Do something!");
  },
});
