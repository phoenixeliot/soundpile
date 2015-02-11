SoundPile.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function (payload) {
    if (payload.shares) {
      this.shares().set(payload.shares, { parse: true });
    }

    delete payload.shares;
    return payload;
  },

  shares: function () {
    if(!this._shares) {
      this._shares = new SoundPile.Collections.Shares([], { parse: true });
    }
    return this._shares;
  }
});

SoundPile.Models.CurrentUser = SoundPile.Models.User.extend({
  url: '/api/current_user',
});
