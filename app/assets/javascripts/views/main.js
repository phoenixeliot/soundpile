SoundPile.Views.Main = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST.test,

  index: function () {
    this.$el.html(this.template({ tracks: ["track1", "track2"] }));
  },

  showTrack: function (track_id) {
    //Swap out everything but the nav and player, render the track page
    this.$el.html(this.template({  }));
  }
});
