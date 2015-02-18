SoundPile.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST["posts/index"],

  initialize: function (options) {
    this.collection.each(this.addPostItem.bind(this));
    this.listenTo(this.collection, 'add', this.addPostItem);
    this.listenTo(this.collection, "remove", function (item) {
      //TODO: Remove the item from the view
      console.log("removed one!");
      console.log(item);
    })
  },

  addPostItem: function (post) {
    var postItemView = new SoundPile.Views.PostItem({ model: post });
    this.addSubview('.posts-list', postItemView);
  },

  render: function () {
    //attach subviews in render
    //TODO: Fetch before render, then listen for the fetch to complete and re-render
    //TODO: Plan out how to render/fetch subviews
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },
});
