SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  template: JST["tracks/show"],

  events: {
    "click .play-track": "play"
  },

  initialize: function () {
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },

  play: function (event) {
    event.preventDefault();
    SoundPile.player.play({
      model: this.model,
      //collection: the playlist for the page
    });
  },
});
