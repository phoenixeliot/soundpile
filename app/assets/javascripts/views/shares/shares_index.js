SoundPile.Views.SharesIndex = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST["shares/index"],

  render: function () {
    var shares = this.collection;
    shares.fetch({
      success: function (shares) {
        this.$el.html(this.template({ shares: shares })); //TODO

        //TODO: memoize these views! This could be a memory leak. (or just really slow)
        shares.each(function (share) {
          var shareItemView = new SoundPile.Views.ShareItem({ model: share });
          this.addSubview('.share-item', shareItemView);
        }.bind(this));
      }.bind(this)
    });
    return this;
  },
});
