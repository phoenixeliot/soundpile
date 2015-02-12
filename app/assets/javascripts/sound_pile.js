window.SoundPile = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SoundPile.tracks = new SoundPile.Collections.Tracks();

    SoundPile.router = new SoundPile.Routers.Router({ $rootEl: $('#main') });
    Backbone.history.start();

    SoundPile.current_user = new SoundPile.Models.CurrentUser();
    SoundPile.current_user.fetch();
  }
};

soundManager.setup({
  url: "/assets",
  preferFlash: false,
  onready: function () {
    //Nothing to do, yet.
    //TODO: Don't create sounds until this triggers (only a problem with flash mode)
  },

  ontimeout: function () {
    console.log("SoundManager timed out. Oh no!");
  },
});
