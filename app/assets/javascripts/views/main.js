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
    this.attachSubviews();
    return this;
  },

  index: function () {
    var posts = new SoundPile.Collections.Posts();
    var indexView = new SoundPile.Views.PostsIndex({ collection: posts });
    posts.fetch({
      success: function (posts) {
        this.replaceSubviews(".page", indexView);
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
        this.replaceSubviews(".page", userShowView);
      }.bind(this)
    });
    return this;
  },
});
