/*
This view doesn't actually play anything--it offloads most of the work to the
PersistentPlayer/model, and updates its own status based on events from the
PersistentPlayer. Clicking on this tells the model to update itself (eg, to seek
to a new position or play/pause)
*/

SoundPile.Views.InlinePlayer = Backbone.CompositeView.extend({
  template: JST["player/inline_player"],

  events: {
    "click .play-track": "play",
    "click .pause-track": "pause",

    "mousedown canvas": "startDrag",
    "mouseup canvas": "stopDrag",
    "mouseleave canvas": "stopDrag",
    "mousemove canvas": "seekIfDragging",
  },

  initialize: function () {
    this.listenTo(this.model, 'position:change', this.renderPosition);
    this.listenTo(this.model, 'load:change', this.renderLoading);
    this.listenTo(this.model, 'pause', this.showPlayButton);
    this.listenTo(this.model, 'play resume', this.showPauseButton);

    this.listenTo(this.model, 'position:change', this.renderWaveform);
    this.listenTo(this.model, 'load:change', this.renderWaveform);
    this.listenTo(this.model, 'pause', this.renderWaveform);
    this.listenTo(this.model, 'play resume', this.renderWaveform);
  },

  render: function () {
    var track = this.model;
    this.$el.html(this.template({ track: this.model }));
    this.renderPosition();
    this.renderLoading();
    this.renderWaveform();
    return this;
  },

  renderPosition: function () {
    var fractionalPosition = this.model.position() / this.model.duration();
    var percentPosition = (fractionalPosition * 100) + "%";
    this.$(".position-bar").css("width", percentPosition);
  },

  renderLoading: function () {
    this.$(".position-bar-loading").css("width", this.model.percentLoaded());
  },

  renderWaveform: function (options) {
    var canvas = this.$("canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var audio = this.model;
    var positionIndex = 192 * (audio.fractionPlayed());
    var loadedIndex = 192 * (audio.fractionLoaded());

    var styles = {
      bar: function (opt) {
        var opacity = (opt.mirror ? 0.5 : 1.0);
        if (!opt.isLoaded) {
          opacity = 0.7;
        }
        if(opt.isPlayed) {
          var gradient = ctx.createLinearGradient(0, 46, 0, 0);
          gradient.addColorStop(0, "rgba(255,83,0,"+ opacity +")");
          gradient.addColorStop(1, "rgba(255,52,0,"+ opacity +")");
          return gradient;
        } else {
          return "rgba(51,51,51, "+ opacity +")";
        }
      },
      gap: function (opt) {
        var opacity = (opt.mirror ? 0.5 : 1.0);
        if (!opt.isLoaded) {
          opacity = 0.7;
        }
        var gradient = ctx.createLinearGradient(0, 46, 0, 0);
        if (opt.isPlayed) {
          gradient.addColorStop(0, "rgba(255,54,2,"+ opacity +")");
          gradient.addColorStop(1, "white");
        } else {
          gradient.addColorStop(0, "rgba(53,53,53,"+ opacity +")");
          gradient.addColorStop(1, "white");
        }
        return gradient;
      },
    };

    //stub data
    var barHeights = [21,35,30,27,33,17,44,43,41,25,37,16,27,31,31,18,24,29,30,30,21,21,40,32,26,17,32,20,18,24,41,22,19,22,16,37,39,32,21,38,38,18,38,26,17,38,28,24,21,35,21,29,20,39,37,43,42,30,35,23,42,38,18,20,38,21,41,24,20,40,38,35,33,24,26,26,33,43,43,28,26,25,24,35,37,32,22,42,29,23,18,34,26,23,20,43,33,17,31,26,26,34,35,42,24,41,42,20,25,37,44,31,27,45,24,41,30,43,16,20,33,16,25,45,38,39,17,22,19,35,24,26,34,39,23,16,33,34,44,45,35,37,44,37,41,31,36,34,44,32,20,20,39,22,32,29,44,25,21,43,43,26,33,34,24,16,27,32,22,16,25,45,35,37,22,31,16,21,28,23,36,39,44,19,21,37,37,41,20,31,24,35];

    gapData = barHeights.map(function (val, i, barHeights) {
      return (barHeights[i+1] < val ? barHeights[i+1] : val);
    });

    ctx.fillStyle = styles.bar({});

    var maxHeight = 36;
    var width = 2;
    $(barHeights).each(function (i, height) {
      var styleOptions = {
        isPlayed: i < positionIndex,
        isLoaded: i < loadedIndex,
      };
      ctx.fillStyle = styles.bar(styleOptions);

      var x = i*3;
      var y = maxHeight - height;
      ctx.fillRect (x, y, width, height);
    });

    width = 1;
    $(gapData).each(function (i, height) {
      var styleOptions = {
        isPlayed: i < positionIndex,
        isLoaded: i < loadedIndex,
      };
      ctx.fillStyle = styles.gap(styleOptions);

      var x = i*3 + 2;
      var y = maxHeight - height;
      ctx.fillRect (x, y, width, height);
    }.bind(this));
  },

  play: function (event) {
    event && event.preventDefault();
    if(this.model === SoundPile.player.model) {
      SoundPile.player.play();
    } else {
      SoundPile.player.start({
        model: this.model,
        //collection: the playlist for the page
      });
    }
  },

  showPauseButton: function (event) {
    this.$(".play-track").hide();
    this.$(".pause-track").show();
  },

  pause: function (event) {
    event.preventDefault();
    this.showPlayButton();
    SoundPile.player.pause();
  },

  showPlayButton: function (event) {
    this.$(".pause-track").hide();
    this.$(".play-track").show();
  },

  seek: function (event) {
    var totalWidth = this.$(".position-bar-container").width();
    var offsetX  = (event.offsetX || event.clientX - $(event.target).offset().left);
    var percentage = offsetX / totalWidth;
    var position = percentage * this.model.duration();
    this.model.setPosition(position);
  },

  startDrag: function (event) {
    this.dragging = true;
  },

  stopDrag: function (event) {
    if (this.dragging) {
      this.dragging = false;
      this.seek(event);
    }
  },

  seekIfDragging: function (event) {
    if (this.dragging) {
      this.seek(event);
    }
  },
});
