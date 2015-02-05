SoundPile.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tracks/:id': 'showTrack'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // var tracks = new SoundPile.Collections.Tracks();
    var view = SoundPile.view = new SoundPile.Views.Main({ });
    this.$rootEl.html(view.$el);
  },

  index: function () {
    SoundPile.view.index();
  },

  showTrack: function (track_id) {
    // Is this called when you navigate to a URL -or- click a link?
    // TODO: Think this through, finish this code
    SoundPile.view.showTrack(track_id);
  }
});
