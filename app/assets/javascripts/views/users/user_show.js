SoundPile.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function (options) {
    var user = this.model;
    this.addSharesIndex(user.shares());
  },

  addSharesIndex: function (shares) {
    var sharesIndex = new SoundPile.Views.SharesIndex({ collection: shares });
    this.addSubview('.shares-index', sharesIndex);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  },

});
