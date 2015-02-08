window.SoundPile = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SoundPile.router = new SoundPile.Routers.Router({ $rootEl: $('#main') });
    Backbone.history.start();
  }
};

soundManager.setup({
  url: "/assets/flash/",
  // preferFlash: false,
  onready: function () {
    //Nothing to do, yet.
  },

  ontimeout: function () {
    console.log("SoundManager timed out. Oh no!");
  },
});
