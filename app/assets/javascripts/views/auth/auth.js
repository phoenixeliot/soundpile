SoundPile.Views.Auth = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.mode = options.mode; //"signup" or "signin"
  },

  events: {
    "submit form.signin": "signin",
    "submit form.signup": "signup",
  },

  template: {
    signin: JST['auth/signin'],
    signup: JST['auth/signup'],
  },

  render: function () {
    var form_authenticity_token = ???;
    var template = this.template[this.mode];
    this.$el.html(template({ auth: this.model }));
    return this;
  },

});

/*
TODO

Auth model
- Stores username, password, sends them to server on save
- sets cookie on successful save
- deletes password after success or failure

Auth view
- Pass mode in to constructor (signup or signin)
- two templates, one view
- intercept events from signup/in forms separately
- both templates have a hidden guest signin form

*/
