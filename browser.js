'use strict';

var hg = require('mercury')
  , socket = require('./socket.js')()
  , Kefir = require('kefir')
  , main = hg.main
  , appEl = document.getElementById('app')
  , argv = process.argv.slice(2)

function bootstrap (app) {
  
  // remove old listeners from the websocket
  socket.removeAllListeners()

  // remove everything from our container
  appEl.innerHTML = ''

  // setup a function by which stuff in render can draw on the dom
  function draw (track, view, docstring) {

    // add a div to the page
    var parent = document.createElement('div')
    var doc    = document.createTextNode(docstring)
    parent.appendChild(doc)
    appEl.appendChild(parent)

    // execute the view module to return the view's draw fn
    // (this lets us keep state in the view module)
    var viewDrawFn = view()

    var loop = main([], viewDrawFn, require('virtual-dom'))

    // add loop to the div
    parent.appendChild(loop.target)
  
    // set each value in the track's output stream 
    // to trigger a `loop.update`, which in turn triggers viewDrawFn
    track.onValue(loop.update)

  }
  
  // pass the stream and the draw fn into the app bootstrap 
  app(socket, draw)

}


// Copied from examples/count.js
function State () {
    return hg.state({
      _hotVersion: hg.value(0), // We use this to force refresh on hot updates
    });
}


socket.on('connect', function () {

  var appState = State();

  // bootstrap for starters
  bootstrap(require(argv[0]))
  
  // Special sauce: detect changes to the app code 
  // and re-bootstrap the page without reloading
  // and without disturbing the socket connection
  if (module.hot) {
  
      module.hot.accept(argv[0], function swapModule () {
  
        // set up the view again
        bootstrap(require(argv[0]))
  
        // Force a re-render by changing the application state.
        appState._hotVersion.set(appState._hotVersion() + 1);
  
        return
  
    });
  
  }

})
