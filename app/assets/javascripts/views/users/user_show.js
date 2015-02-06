SoundPile.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST["users/show"],

  render: function () {
    // Defers most of the work to the TrackItem view
    //TODO: memoize view
    // var shares = new SoundPile.Collections.Shares();
    var user = this.model;
    var shares = user.shares();
    console.log(shares);
    shares.fetch({
      data: { user_id: this.model.id },
      success: function (shares) {
        this.$el.html(this.template({ user: this.model }));

        //TODO: memoize this view! This could be a memory leak. (or just really slow)
        var sharesIndex = new SoundPile.Views.SharesIndex({ collection: shares });
        this.addSubview('.shares-index', sharesIndex);
      }.bind(this)
    });
    return this;
  },
});
