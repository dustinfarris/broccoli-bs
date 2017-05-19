# broccoli-bs

[![Greenkeeper badge](https://badges.greenkeeper.io/dustinfarris/broccoli-bs.svg)](https://greenkeeper.io/)

Launch browser-sync and listen for changes.

## Installation

```
yarn add -D broccoli-bs
```


## Usage

Give broccoli-bs a list of nodes to watch.  When anything changes,
broccoli-bs will tell browser-sync to reload the browsers.  If the
only change is a CSS file, browser-sync will inject the new CSS live!

You may also provide options to the plugin.  The `bs` option will be
passed on to browser-sync.  See [browser-sync options](https://www.browsersync.io/docs/options).


### Example

```js
// Brocfile.js

const BrowserSync = require('broccoli-bs');
const merge = require('broccoli-merge-trees');

// ...

const assets = merge([ imgTree, jsTree, cssTree ]);

const browserSync = new BrowserSync(assets, {
  bs: {
    proxy: 'http://localhost:4000',  // maybe you have a Phoenix server running?
    open: false  // maybe you don't want browser to open automatically?
  }
});

module.exports = merge([ assets, browserSync ]);
```


## License

MIT
