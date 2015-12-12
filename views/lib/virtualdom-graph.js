var h = require('virtual-dom/h')
  , _ = require('lodash')
  , LinScale = require('simple-linear-scale')

// a function that builds the graph from a list
// returns virtual-dom/h
function makeGraph (opts) {

  var divHeight = 100
  if (opts && opts.divHeight)
    divHeight = opts.divHeight

  // default color
  var c = '#3ee'
  if (opts && opts.color)
    c = opts.color

  // default title
  var t = ''
  if (opts && opts.title)
    t = opts.title

  return (list) =>  {

    var maxValue = _.max(list)

    var normalize = LinScale([0, maxValue], [0, divHeight])

    function drawMagnitude (mag) {
      return h('div.point', { style: {
          'height': normalize(mag) + 'px'
        , 'width': '1px' 
        , 'float': 'left'
        , 'padding':'1px' 
        , 'background-color': c
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
       , 'height': divHeight + 'px'
     }}, [
        h('h2', t)
      , list.map(drawMagnitude) 
      , maxValueAxis(maxValue)
    ])
  }
}

module.exports = makeGraph