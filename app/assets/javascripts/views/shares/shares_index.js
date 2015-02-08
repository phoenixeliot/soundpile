SoundPile.Views.SharesIndex = Backbone.CompositeView.extend({
  template: JST["shares/index"],

  initialize: function (options) {
    this.collection.each(this.addShareItem.bind(this));
    this.listenTo(this.collection, 'add', this.addShareItem);
  },

  addShareItem: function (share) {
    var shareItemView = new SoundPile.Views.ShareItem({ model: share });
    this.addSubview('.shares-list', shareItemView);
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
