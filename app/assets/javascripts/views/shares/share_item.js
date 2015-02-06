SoundPile.Views.ShareItem = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST["shares/show"],

  render: function () {
    // Defers most of the work to the TrackItem view
    var share = this.model;//new SoundPile.Models.Share({ id: $el.data('share-id') });
    share.fetch({
      success: function (share) {
        this.$el.html(this.template({ share: share })); //TODO
      }.bind(this)
    });
    return this;
  },
});
