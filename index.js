var jsdom = require('jsdom');

var cached;

function getOpenBridges () {
  return new Promise(function (resolve, reject) {
    jsdom.env(
      'https://brugopen.nl/',
      function (err, window) {
        if (err) {
          reject(err);
          return;
        }

        resolve(cached || (cached = [].slice.call(
          window.document.querySelectorAll('#openbridges ul li a')
        ).map(function (node) {
          return node.innerHTML.trim();
        })));

        // save memory
        window.close();
      });
  });
}

function isKutBrugOpen (openBridges) {
  return ~openBridges.indexOf('Spijkenisserbrug');
}

// clear the cache every 30 seconds
setInterval(function () {
  if (cached) cached = null;
}, 3e4);
