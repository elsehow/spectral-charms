'use strict'

var textlist = require('./lib/virtualdom-text-list'),
    view = require('./lib/virtualdom-view'),
    CircularBuffer = require('circular-buffer')

// a function that builds the graph from a list
// returns virtual-dom/h
var buff = []

module.exports = function (opts) {

  var v = view(textlist(opts))

  var b = new CircularBuffer(100)

  return  {

    handler: (x) => {
      b.enq(x)
      v.handler(b.toarray())
    },

    taredown: v.taredown

  }
}


