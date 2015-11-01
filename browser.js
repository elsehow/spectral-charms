'use strict';

var hg = require('mercury')
  , socket = require('./socket.js')()
  , Kefir = require('kefir')
  , main = require('main-loop')
  , appEl = document.getElementById('app')

  // TODO  main-loop
  // naive move: 
  //   clear the whole parent div
  //   pass stream,draw to 'render'
  //   try bandpass + spectrogram..
function setup (render) {
  // remove old listeners from the websocket
  socket.removeAllListeners()
  // set up a fresh stream from the socket 
  var stream = Kefir.fromEvents(socket, 'mindwave-raw-buffers')
  // remove everything from our container
  appEl.innerHTML = ''
  // setup a function by which stuff in render can draw on the dom
  function draw (trackStream, drawFn, trackDescription) {
    var parent = document.createElement('div')
    var desc   = document.createTextNode(trackDescription)
    parent.appendChild(desc)
  
    appEl.appendChild(parent)
  
    var loop = main([], drawFn, require('virtual-dom'))
    parent.appendChild(loop.target)
  
    trackStream.onValue(loop.update)
  }
  render(stream, draw)
}

// Copied from examples/count.js
function App () {
    return hg.state({
      _hotVersion: hg.value(0), // We use this to force refresh on hot updates
    });
}


socket.on('connect', function () {
  
  var appState = App();
  
  setup(require('./render.js'))
  
  // Special sauce: detect changes to the rendering code and swap the rendering
  // function out without reloading the page.
  if (module.hot) {
  
      module.hot.accept('./render.js', function swapModule () {
  
        // set up the view again
        setup(require('./render.js'))
  
        // Force a re-render by changing the application state.
        appState._hotVersion.set(appState._hotVersion() + 1);
  
        return
  
    });
  
  }

})
