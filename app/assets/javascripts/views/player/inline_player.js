/*
This view doesn't actually play anything--it offloads most of the work to the
PersistentPlayer, and updates its own status based on events from the
PersistentPlayer. Clicking on this tells the PersistentPlayer to update itself
(eg, to seek to a new position or play/pause)
*/

SoundPile.Views.InlinePlayer = Backbone.CompositeView.extend({
  template: JST["player/inline_player"],

  events: {
    "click .play-track": "play"
  },

  initialize: function () {
    this.listenTo(this.model, 'position:change', this.renderProgress);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },

  renderProgress: function () {
    var fractionalPosition = this.model.position() / this.model.duration();
    var percentPosition = (fractionalPosition * 100) + "%";
    this.$(".position-bar").css("width", percentPosition);
  },

  play: function (event) {
    event.preventDefault();
    SoundPile.player.start({
      model: this.model,
      //collection: the playlist for the page
    });
  },
});
