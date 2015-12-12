'use strict'

var main = require('main-loop')
  , graph = require('./lib/virtualdom-graph')
  , view = require('./lib/virtualdom-view')
  , CircularBuffer = require('circular-buffer')

// TODO - default arguments, when v8 supports this
module.exports = function (size, opts) {
  // make a circular buffer to hold the data
  if (size)
    var buff = new CircularBuffer(size)
  else
    var buff = new CircularBuffer(100)
  // set up a graph view
  var v = view(graph(opts))
  // add each item to a buffer, and update graph with buffer contents
  return {
    handler: (x) => {
      buff.enq(x)
      v.handler(buff.toarray())
    },
    taredown: v.taredown
  }
}

