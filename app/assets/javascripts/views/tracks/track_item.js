/*
This view contains the inline player subview, and buttons/links about a track
that are not part of the inline player
*/

SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  template: JST["tracks/show"],

  events: {
    "click button.like": "addLike"
  },

  initialize: function () {
    var inlinePlayerView = new SoundPile.Views.InlinePlayer({ model: this.model });
    this.addSubview(".inline-player", inlinePlayerView);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
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
    console.log(like);
    like.save({}, {
      success: function (options) {
        console.log("You like it!"); //TODO: Remove, maybe replace
      }
    });
  },
});
