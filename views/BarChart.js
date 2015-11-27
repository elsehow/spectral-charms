var h = require('virtual-dom/h')
  , main = require('main-loop')
  , _ = require('lodash')
  , LinScale = require('simple-linear-scale')

module.exports = function (stream) {

  // a function that builds the graph from a list
  // returns virtual-dom/h
  function makeGraph (list) {

    var divHeight = 100

    var maxValue = _.max(list)

    var normalize = LinScale([0, maxValue], [0, divHeight])

    function drawMagnitude (mag) {
      return h('div.point', { style: {
          'height': normalize(mag) + 'px'
        , 'width': '1px' 
        , 'float': 'left'
        , 'padding':'1px' 
        , 'background-color': '#3ee'
        }
       })
      }

    function maxValueAxis (v) {
      return h('div', { style: {
        'position':'absolute'
      , 'bottom': '10px'
      , 'left': '0'
      , 'font-size': '8pt'
      , 'font-style': 'italic'
      , 'color': '#ccc'
      }}
      , v)
    }

    return h('div', { 
      style: {
         'overflow': 'hidden'
       , 'padding-bottom': '30px'
       , 'position': 'relative'
     }}, [
        list.map(drawMagnitude) 
      , maxValueAxis(maxValue)
    ])
  }

  // here we setup a div 
  // and main-loop
  // we add a div to the page
  var viewsEl = document.getElementById('views')
  var ourDiv = document.createElement('div')
  views.appendChild(ourDiv)
  // `loop.update` will pass values to `makeGraph`
  var loop = main([], makeGraph, require('virtual-dom'))
  // now add loop to div
  ourDiv.appendChild(loop.target)

  // set each value in the track's output stream 
  // to trigger a `loop.update`, which in turn triggers viewDrawFn
  stream.map(makeGraph).onValue(loop.update)

}
