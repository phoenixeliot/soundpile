SoundPile.Views.ShareItem = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST["shares/show"],

  render: function () {
    // Defers most of the work to the TrackItem view
    var share = this.model;
    share.fetch({
      success: function (share) {
        this.$el.html(this.template({ share: share })); //TODO
        //TODO: memoize this view
        var trackItemView = new SoundPile.Views.TrackItem({ model: share.track() });
        this.addSubview('.track-item', trackItemView);
      }.bind(this)
    });
    return this;
  },
});
