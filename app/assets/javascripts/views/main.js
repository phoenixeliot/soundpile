SoundPile.Views.Main = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST.show,

  index: function () {
    this.$el.html(this.template({ tracks: ["track1", "track2"] }));
  },

  showTrack: function (track_id) {
    //Swap out everything but the nav and player, render the track page
    var track = new SoundPile.Models.Track({ id: track_id });
    track.fetch({
      success: function (track) {
        this.$el.html(this.template({ track: track })); //TODO
      }.bind(this)
    });
  }
});
