SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  template: JST["tracks/show"],

  initialize: function () {
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },
});
