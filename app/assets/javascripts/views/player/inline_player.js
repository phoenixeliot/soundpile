SoundPile.Views.InlinePlayer = Backbone.CompositeView.extend({
  template: JST["player/inline_player"],

  events: {
    "click .play-track": "play"
  },

  initialize: function () {
    this.listenTo(this.model, 'progress:playing', this.render);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },

  play: function (event) {
    event.preventDefault();
    SoundPile.player.start({
      model: this.model,
      //collection: the playlist for the page
    });
  },
});
