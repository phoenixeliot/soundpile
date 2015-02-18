SoundPile.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function (options) {
    var user = this.model;
    this.addPostsIndex(user.posts());
  },

  addPostsIndex: function (posts) {
    var postsIndex = new SoundPile.Views.PostsIndex({ collection: posts });
    this.addSubview('.posts-index', postsIndex);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  },

});
