/*
This view contains the inline player subview, and buttons/links about a track
that are not part of the inline player
*/

SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  template: JST["tracks/show"],

  events: {
    "click button.like:not(.selected)": "addLike",
    "click button.like.selected": "removeLike",
  },

  initialize: function () {
    var inlinePlayerView = new SoundPile.Views.InlinePlayer({ model: this.model });
    this.addSubview(".inline-player", inlinePlayerView);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));

    if (this.model.current_user_like) {
      console.log("Track is already liked");
      this.$("button.like").addClass("selected");
    }

    //player subview does most of the work
    this.attachSubviews();
    return this;
  },

  addLike: function (event) {
    event.preventDefault();
    console.log("Liking...");
    var like = new SoundPile.Models.Like({
      user_id: SoundPile.current_user.id,
      track_id: this.model.id
    });
    like.save({}, {
      success: function (like) {
        this.$("button.like").addClass("selected");
        this.model.current_user_like = like;
      }.bind(this)
    });
  },

  removeLike: function (event) {
    //TODO: Put some of this in the Track model?
    event.preventDefault();
    console.log("Unliking...");
    var like = this.model.current_user_like;
    like.destroy({
      success: function (like) {
        this.$("button.like").removeClass("selected");
        this.model.current_user_like = null;
      }.bind(this)
    });
  },
});
