SoundPile.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tracks/:id': 'showTrack',
    'users/:id': 'showUser'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    var view = SoundPile.view = new SoundPile.Views.Main();
    this.$rootEl.html(view.render().$el);
  },

  index: function () {
    SoundPile.view.index();
  },

  showTrack: function (track_id) {
    SoundPile.view.showTrack(track_id);
  },

  showUser: function (user_id) {
    SoundPile.view.showUser(user_id);
  },
});
