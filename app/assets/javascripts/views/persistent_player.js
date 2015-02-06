SoundPile.Views.PersistentPlayer = Backbone.CompositeView.extend({
  template: JST["persistent_player"],

  initialize: function () {
    // this.listenTo(this.collection, 'reset', function () {
    //   this.model = this.collection.first();
    // });
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    return this;
  },
});
