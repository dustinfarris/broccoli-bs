require('string.prototype.endswith');

var Plugin = require('broccoli-diffing-writer');
var bs = require('browser-sync');


BroccoliBsPlugin.prototype = Object.create(Plugin.prototype);
BroccoliBsPlugin.constructor = BroccoliBsPlugin;


function BroccoliBsPlugin(inputNode, options) {
  options = options || {};

  if (!(this instanceof BroccoliBsPlugin)) {
    return new BroccoliBsPlugin(inputNode, options);
  }

  Plugin.call(this, inputNode, {
    annotation: options.annotation
  });

  this.bs = bs.create();
  this.bs.init(options.bs || {});
}


BroccoliBsPlugin.prototype.build = function(diff) {
  var changedItems = diff.filter(function(i) {
    return i[0] === "change";
  });
  for (var x = 0; x < changedItems.length; x++) {
    if (!changedItems[x][1].endsWith(".css")) {
      // A non-CSS file was changed.  Reload everything!
      this.bs.reload();
      return;
    }
  }
  cssPaths = changedItems.map(function(i) { return i[1]; });
  if (cssPaths.length > 0) {
    this.bs.reload(cssPaths);
  }
};


module.exports = BroccoliBsPlugin;
