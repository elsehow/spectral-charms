var h = require('virtual-dom/h')
  , _ = require('lodash')
  , LinScale = require('simple-linear-scale')
  , LogScale = require('log-scale')
  , CircularBuffer = require('circular-buffer')

function spectrogram () {

  var divHeight = 100

  var minWidth = 200

  var lineHeight = 2

  var bufferSize = divHeight / lineHeight

  var buffer = new CircularBuffer(bufferSize)
  
  return function (list) {
    
    // ad new list to buffer
    buffer.enq(list)

    // dump whole buffer
    var allBufferedLists = buffer.toarray()

    // get min and max from whole buffer
    var f = _.flatten(allBufferedLists)
    var minValue = _.min(f)
    var maxValue = _.max(f)
  
    //var logScale = new LogScale(minValue, maxValue)
    // hues, blue to red: http://hslpicker.com/#f00
    //var linScale = LinScale([0, 1], [235, 360])
    // make a function that turns a magnitude into a color
//    function hueScale (v) {
//      return linScale(logScale.logarithmicToLinear(v))
//    }
  
    // hues, blue to red: http://hslpicker.com/#f00
    var hueScale = LinScale(
        [minValue, maxValue]
      , [235, 360])

    function drawMagnitude (mag) {

      var colorString = 'hsl(' + hueScale(mag) + ', 100%, 50%)'

      return h('div.point', { style: {
          'height': lineHeight + 'px'
        , 'width': '1px' 
        , 'float': 'left'
        , 'background-color': colorString
        }
      })

    }

    function drawSpecBar (list) {
      return h('div', { style: {
        'clear':'both'
      }},
        _.map(list, drawMagnitude))
    }
      
    return h('div', { 
      style: {
       'overflow': 'hidden'
     , 'padding-bottom': '30px'
     }}, 
      _.map(allBufferedLists, drawSpecBar))

  }
    
}


module.exports = spectrogram
