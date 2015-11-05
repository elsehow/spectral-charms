var h = require('virtual-dom/h')
  , _ = require('lodash')
  , LinScale = require('simple-linear-scale')
  , LogScale = require('log-scale')
  , CircularBuffer = require('circular-buffer')

function histogram () {

  var divHeight = 300

  var divWidth = 1000

  var barWidth = 5 

  var bufferSize = Math.round(divWidth / barWidth)

  var buffer = new CircularBuffer(bufferSize)

  return function (val) {

    // add to buffer
    buffer.enq(val)

    // dump whole buffer
    var buff = buffer.toarray()

    // get min and max from whole buffer
    //var minValue = _.min(buff)
    var maxValue = _.max(buff)
  
    var barHeightScale = LinScale(
        [0, maxValue]
      , [1, divHeight])

    function drawMagnitude (mag) {

      var heightString = barHeightScale(mag) + 'px'

      return h('div.point', { style: {
          'height': heightString
        , 'width': barWidth + 'px'
        , 'float': 'left'
        , 'background-color': '#00e'
        , 'color': '#fff'
        , 'font-size':'9pt'
        }
      })
      //, Math.round(mag))

    }

    return h('div', { 
      style: {
       'overflow': 'hidden'
     , 'padding-bottom': '30px'
     }}, 
     _.map(buff, drawMagnitude))
  }
}


module.exports = histogram
