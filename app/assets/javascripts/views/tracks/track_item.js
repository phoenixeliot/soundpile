SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST["tracks/show"],

  render: function () {
    // Defers most of the work to the TrackItem view
    var track = this.model;
    track.fetch({
      success: function (track) {
        this.$el.html(this.template({ track: track })); //TODO
      }.bind(this)
    });
    return this;
  },
});
