/*
This view contains the inline player subview, and buttons/links about the track
which are not part of the inline player
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

    this.listenTo(this.model, "like:add", function () {
      this.$("button.like").addClass("selected");
    });
    this.listenTo(this.model, "like:remove", function () {
      this.$("button.like").removeClass("selected");
    });
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
    this.model.addLike();
  },

  removeLike: function (event) {
    //TODO: Put some of this in the Track model?
    event.preventDefault();
    console.log("Unliking...");
    this.model.removeLike();
  },
});
