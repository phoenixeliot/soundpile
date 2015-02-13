/*
This view contains the inline player subview, and buttons/links about the track
which are not part of the inline player
*/

SoundPile.Views.TrackItem = Backbone.CompositeView.extend({
  template: JST["tracks/show"],

  events: {
    "click button.like:not(.selected)": "addLike",
    "click button.like.selected": "removeLike",
    "click button.share:not(.selected)": "addShare",
    "click button.share.selected": "removeShare",
  },

  initialize: function () {
    var inlinePlayerView = new SoundPile.Views.InlinePlayer({ model: this.model });
    this.addSubview(".inline-player", inlinePlayerView);

    this.listenTo(this.model, "like:add", function () {
      this.render();
      this.$("button.like").addClass("selected");
    });
    this.listenTo(this.model, "like:remove", function () {
      this.render();
      this.$("button.like").removeClass("selected");
    });
    this.listenTo(this.model, "share:add", function () {
      this.render();
      this.$("button.share").addClass("selected");
    });
    this.listenTo(this.model, "share:remove", function () {
      this.render();
      this.$("button.share").removeClass("selected");
    });
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));

    if (this.model.current_user_like) {
      this.$("button.like").addClass("selected");
    }
    if (this.model.current_user_share) {
      this.$("button.share").addClass("selected");
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

  addShare: function (event) {
    event.preventDefault();
    if (SoundPile.current_user.enforceLogin()) {
      this.model.addShare();
    }
  },

  removeShare: function (event) {
    event.preventDefault();
    if (SoundPile.current_user.enforceLogin()) {
      this.model.removeShare();
    }
  },
});
