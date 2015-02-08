SoundPile.Views.PersistentPlayer = Backbone.CompositeView.extend({
  template: JST["persistent_player"],

  initialize: function () {
    //TODO: Make sure I'm not over/under-caching files.
    //TODO: Listen for events on the collection/model?
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },

  play: function (options) {
    this.model.audio.pause();
    this.model = options.model;
    this.render();
    this.model.audio.play();
    //TODO: Use SoundManager2
  },
});
