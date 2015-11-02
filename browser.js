'use strict';

var hg = require('mercury')
  , socket = require('./socket.js')()
  , Kefir = require('kefir')
  , main = require('main-loop')
  , appEl = document.getElementById('app')
  // config
  , appPath = './examples/mindwave.js'

function bootstrap (appBootstrapFn) {

  // remove old listeners from the websocket
  socket.removeAllListeners()

  // remove everything from our container
  appEl.innerHTML = ''

  // setup a function by which stuff in render can draw on the dom
  function draw (trackStream, viewModule, trackDescription) {

    // add a div to the page
    var parent = document.createElement('div')
    var desc   = document.createTextNode(trackDescription)
    parent.appendChild(desc)
    appEl.appendChild(parent)

    // execute the view module to return the view's draw fn
    // (this lets us keep state in the view module)
    var viewDrawFn = viewModule()

    var loop = main([], viewDrawFn, require('virtual-dom'))

    // add loop to the div
    parent.appendChild(loop.target)
  
    // set each value in the track's output stream 
    // to trigger a `loop.update`, which in turn triggers viewDrawFn
    trackStream.onValue(loop.update)

  }
  
  // pass the stream and the draw fn into the app bootstrap 
  appBootstrapFn(socket, draw)

}

// Copied from examples/count.js
function App () {
    return hg.state({
      _hotVersion: hg.value(0), // We use this to force refresh on hot updates
    });
}


socket.on('connect', function () {
  
  var appState = App();

  // bootstrap for starters
  bootstrap(require(appPath))
  
  // Special sauce: detect changes to the app code 
  // and re-bootstrap the page without reloading
  // and without disturbing the socket connection
  if (module.hot) {
  
      module.hot.accept(appPath, function swapModule () {
  
        // set up the view again
        bootstrap(require(appPath))
  
        // Force a re-render by changing the application state.
        appState._hotVersion.set(appState._hotVersion() + 1);
  
        return
  
    });
  
  }

})
