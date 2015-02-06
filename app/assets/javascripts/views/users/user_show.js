SoundPile.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    var user = this.model;
    this.addSharesIndex(user.shares());
  },

  addSharesIndex: function (shares) {
    var sharesIndex = new SoundPile.Views.SharesIndex({ collection: shares });
    this.addSubview('.shares-index', sharesIndex);
  },

  template: JST["users/show"],

  render: function () {
    // Defers most of the work to the TrackItem view
    //TODO: memoize view
    // var shares = new SoundPile.Collections.Shares();
    var user = this.model;
    var shares = user.shares();
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  },

});
