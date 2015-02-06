SoundPile.Views.SharesIndex = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST["shares/index"],

  render: function () {
    var shares = this.collection;
    console.log(shares);
    //TODO: Fetch before render, then listen for the fetch to complete and re-render
    //TODO: Plan out how to render/fetch subviews

    this.$el.html(this.template({ shares: shares })); //TODO

    //TODO: memoize these views! This could be a memory leak. (or just really slow)
    shares.each(function (share) {
      var shareItemView = new SoundPile.Views.ShareItem({ model: share });
      this.addSubview('.shares-list', shareItemView);
    }.bind(this));

    return this;
  },
});
