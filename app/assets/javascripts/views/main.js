SoundPile.Views.Main = Backbone.CompositeView.extend({
  initialize: function () {

  },

  index: function () {
    this.$el.html(this.template({ tracks: ["track1", "track2"] })); //TODO
    return this;
  },

  showTrack: function (track_id) {
    //Swap out everything but the nav and player, render the track page
    var track = new SoundPile.Models.Track({ id: track_id });
    track.fetch({
      success: function (track) {
        this.$el.html(JST["tracks/show"]({ track: track })); //TODO
      }.bind(this)
    });
    return this;
  },

  showUser: function (user_id) {
    //Swap out everything but the nav and player, render the user page
    // var shares = new SoundPile.Collections.Shares();
    var user = new SoundPile.Models.User({ id: user_id });

    var userShowView = new SoundPile.Views.UserShow({ model: user });

    user.fetch({
      success: function (user) {
        this.$el.html(userShowView.render().$el);
      }.bind(this)
      // success: function (user) {
      //   this.$el.html(JST["users/show"]({ user: user })); //TODO
      // }.bind(this)
    });
    return this;
  },
});
