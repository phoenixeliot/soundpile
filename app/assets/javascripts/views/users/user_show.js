SoundPile.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST["users/show"],

  render: function () {
    // Defers most of the work to the TrackItem view
    var shares = new SoundPile.Collections.Shares();
    shares.fetch({
      data: { owner_id: this.model.id },
      success: function (shares) {
        this.$el.html(this.template({ user: this.model }));

        //TODO: memoize this view! This could be a memory leak. (or just really slow)
        var sharesIndex = new SoundPile.Views.SharesIndex({ collection: shares });
        this.$('.shares-list').html(sharesIndex.render().$el);
        this.addSubview('shares-list', sharesIndex);
      }.bind(this)
    });
    return this;
  },
});
