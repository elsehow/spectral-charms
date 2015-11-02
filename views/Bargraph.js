var h = require('virtual-dom/h')
  , _ = require('lodash')
  , LinScale = require('simple-linear-scale')

function spectrogram (list) {

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
      _.map(list, drawMagnitude) 
    , maxValueAxis(maxValue)
  ])
    
}


module.exports = spectrogram
