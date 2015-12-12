'use strict'

var main = require('main-loop')
  , graph = require('./lib/virtualdom-graph')
  , view = require('./lib/virtualdom-view')

module.exports = function (opts) {
  return view(graph(opts))
}


