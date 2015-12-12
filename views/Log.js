'use strict'

var h = require('virtual-dom/h')
  , main = require('main-loop')

// a function that builds the graph from a list
// returns virtual-dom/h
var buff = []

function drawLog (item) {

  var divHeight = 300
  var divWidth = 300

  function drawList (i) {
    if (i.length)
      i = i.join(',')
    buff.push(i)
    return buff.reverse().map(i => h('p', [i]))
  }

  return h('div', { 
    style: {
       'overflow': 'scroll', 
       'font-family': 'monospace', 
       'font-size': '9pt', 
       'height': divHeight + 'px', 
       'max-width': divWidth + 'px', 
   }}, [
      drawList(item)
  ])
}



module.exports = function () {
  // global refs to our HTML elements
  var viewsEl = document.getElementById('views')
  var ourDiv = document.createElement('div')
  // we add a div to the page
  // setup main-loop
  // `loop.update` will pass values to `makeGraph`
  var loop = main([], drawLog, require('virtual-dom'))
  // now add loop to div
  ourDiv.appendChild(loop.target)
  viewsEl.appendChild(ourDiv)
  return {
    handler: (x) => loop.update(x),
    taredown: () => ourDiv.remove()
  }
}

