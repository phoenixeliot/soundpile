SoundPile.Collections.Tracks = Backbone.Collection.extend({
  model: SoundPile.Models.Track,

  url: '/api/tracks',

  getOrCreate: function (attributes, options) {
    var id = attributes.id;
    if (typeof this.get(id) === "undefined") {
      this.add(new SoundPile.Models.Track(attributes, options));
    }
    return this.get(id);
  },
});
