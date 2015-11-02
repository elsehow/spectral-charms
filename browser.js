'use strict';

var hg = require('mercury')
  , socket = require('./socket.js')()
  , Kefir = require('kefir')
  , main = require('main-loop')
  , appEl = document.getElementById('app')

function bootstrap (appSetupFn) {

  // remove old listeners from the websocket
  socket.removeAllListeners()

  // set up a fresh stream from the socket 
  var stream = Kefir.fromEvents(socket, 'mindwave-raw-buffers')

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
  appSetupFn(stream, draw)

}

// Copied from examples/count.js
function App () {
    return hg.state({
      _hotVersion: hg.value(0), // We use this to force refresh on hot updates
    });
}


socket.on('connect', function () {
  
  var appState = App();
  
  bootstrap(require('./render.js'))
  
  // Special sauce: detect changes to the rendering code and swap the rendering
  // function out without reloading the page.
  if (module.hot) {
  
      module.hot.accept('./render.js', function swapModule () {
  
        // set up the view again
        bootstrap(require('./render.js'))
  
        // Force a re-render by changing the application state.
        appState._hotVersion.set(appState._hotVersion() + 1);
  
        return
  
    });
  
  }

})
