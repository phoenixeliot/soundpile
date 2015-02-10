SoundPile.Views.Main = Backbone.CompositeView.extend({
  initialize: function () {
    var persistentPlayerView = new SoundPile.Views.PersistentPlayer({
      model: new SoundPile.Models.Track(),
      //collection: TODO: some playlist stuff (here it should be empty?)
    });
    SoundPile.player = persistentPlayerView;
    this.addSubview(".persistent-player", persistentPlayerView);
  },

  template: JST["main"],

  //Note: This should not be called regularly! That would break the player.
  render: function () {
    this.$el.html(this.template());
    this.attachSubviews(); //TODO: not sure if this goes here
    return this;
  },

  index: function () {
    var shares = new SoundPile.Collections.Shares();
    var indexView = new SoundPile.Views.Index();
    shares.fetch({
      success: function (shares) {
        this._swapView(indexView);
      }.bind(this)
    });
    return this;
  },

  showTrack: function (track_id) {
    //Swap out everything but the nav and player, render the track page
    var track = new SoundPile.Models.Track({ id: track_id });
    track.fetch({
      success: function (track) {
        this.$(".page").html(JST["tracks/show"]({ track: track })); //TODO
      }.bind(this)
    });
    return this;
  },

  showUser: function (user_id) {
    //Swap out everything but the nav and player, render the user page
    var user = new SoundPile.Models.User({ id: user_id });
    var userShowView = new SoundPile.Views.UserShow({ model: user });

    user.fetch({
      success: function (user) {
        this._swapView(userShowView);
      }.bind(this)
    });
    return this;
  },

  //TODO: do I even need this if I'm using add/removeSubview?
  _swapView: function (view) {
    this.removeSubview(".page");
    this.addSubview(".page", view);
  },
});
