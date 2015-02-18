/*
This view contains the inline player subview, and buttons/links about the track
which are not part of the inline player
*/

SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  template: JST["tracks/show"],

  events: {
    "click button.like:not(.selected)": "addLike",
    "click button.like.selected": "removeLike",
    "click button.post:not(.selected)": "addPost",
    "click button.post.selected": "removePost",
  },

  initialize: function () {
    var inlinePlayerView = new SoundPile.Views.InlinePlayer({ model: this.model });
    this.addSubview(".inline-player", inlinePlayerView);

    this.listenTo(this.model, "like:add like:remove post:add post:remove", this.render);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));

    if (this.model.current_user_like) {
      this.$("button.like").addClass("selected");
      this.$(".track-counts .likes").addClass("highlight");
    }
    if (this.model.current_user_post) {
      this.$("button.post").addClass("selected");
      this.$(".track-counts .posts").addClass("highlight");
    }

    //player subview does most of the work
    this.attachSubviews();
    return this;
  },

  addLike: function (event) {
    event.preventDefault();
    if (SoundPile.current_user.enforceLogin()) {
      this.model.addLike();
    }
  },

  removeLike: function (event) {
    event.preventDefault();
    if (SoundPile.current_user.enforceLogin()) {
      this.model.removeLike();
    }
  },

  addPost: function (event) {
    event.preventDefault();
    if (SoundPile.current_user.enforceLogin()) {
      this.model.addPost();
    }
  },

  removePost: function (event) {
    event.preventDefault();
    if (SoundPile.current_user.enforceLogin()) {
      this.model.removePost();
    }
  },
});
