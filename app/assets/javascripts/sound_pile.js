window.SoundPile = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SoundPile.router = new SoundPile.Routers.Main({ $rootEl: $('#main') });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SoundPile.initialize();
});
