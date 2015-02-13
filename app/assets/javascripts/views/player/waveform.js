SoundPile.Views.Waveform = Backbone.CompositeView.extend({
  initialize: function (attributes) {
    this.listenTo(this.model, 'position:change', this.renderWaveform);
    this.listenTo(this.model, 'load:change', this.renderWaveform);
    this.listenTo(this.model, 'pause', this.renderWaveform);
    this.listenTo(this.model, 'play resume', this.renderWaveform);
  },

  template: JST["player/waveform"],

  render: function () {
    this.$el.html(this.template({}));
    this.renderWaveform();
    return this;
  },

  renderWaveform: function (options) {
    var canvas = this.$("canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var track = this.model;
    var positionIndex = 192 * (track.fractionPlayed());
    var loadedIndex = 192 * (track.fractionLoaded());

    var styles = {
      bar: function (opt) {
        var opacity = (opt.mirror ? 0.5 : 1.0);
        if (!opt.isLoaded) {
          opacity *= 0.7;
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
          opacity *= 0.7;
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

    var barHeights = track.get("peakData");

    gapData = barHeights.map(function (val, i, barHeights) {
      return (barHeights[i+1] < val ? barHeights[i+1] : val);
    });

    ctx.fillStyle = styles.bar({});

    var maxHeight = 36;
    var mirrorHeight = 18;
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

      ctx.fillStyle = styles.bar($.extend(styleOptions, { mirror: true }));
      y = maxHeight;
      ctx.fillRect (x, y, width, height * 0.4);
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

      ctx.fillStyle = styles.gap($.extend(styleOptions, { mirror: true }));
      y = maxHeight;
      ctx.fillRect (x, y, width, height * 0.4);
    }.bind(this));
  },
});
