SoundPile.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function (payload) {
    if (payload.posts) {
      this.posts().set(payload.posts, { parse: true });
    }

    delete payload.posts;
    return payload;
  },

  posts: function () {
    if(!this._posts) {
      this._posts = new SoundPile.Collections.Posts([], { parse: true });
    }
    return this._posts;
  }
});

SoundPile.Models.CurrentUser = SoundPile.Models.User.extend({
  url: '/api/current_user',

  enforceLogin: function () {
    if (!this.isLoggedIn()){
      $("a.signin").blink();
    };
    return this.isLoggedIn();
  },

  isLoggedIn: function () {
    return (typeof this.attributes.id !== "undefined");
  },
});
