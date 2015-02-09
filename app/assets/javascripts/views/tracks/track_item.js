/*
This view contains the inline player subview, and buttons/links about a track
that are not part of the inline player
*/

SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  template: JST["tracks/show"],

  events: {
  },

  initialize: function () {
    var inlinePlayerView = new SoundPile.Views.InlinePlayer({ model: this.model });
    this.addSubview(".inline-player", inlinePlayerView);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    //player subview does most of the work
    this.attachSubviews();
    return this;
  },
});
