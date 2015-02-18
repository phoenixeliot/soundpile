SoundPile.Views.PostItem = Backbone.CompositeView.extend({
  className: "post-item",
  template: JST["posts/show"],

  initialize: function () {
    var post = this.model;
    var trackItemView = new SoundPile.Views.TrackItem({ model: post.get("track") });
    this.addSubview('.track-item', trackItemView);
  },

  render: function () {
    // Defers most of the work to the TrackItem view
    var post = this.model;
    this.$el.html(this.template({ post: post }));
    this.attachSubviews();
    return this;
  },
});
