var average = require('average')
  , stdev   = require('compute-stdev')

// takes a stream of integers `s`, 
// a buffer size `b`, 
// and a standard deviation `stdev`
//
// returns a stream of all integers more than `stdev` standard deviations 
// above (if positive) or below (if negative) the mean of the last `b` 
// values over `s`.
// 
// so, for example
//
//     var spikes = SpikeDetector(myStream, 1000, -2)
//
// `spikes` will be a stream of all integers over `myStream`
// for which the value was -2 standard deviations less than
// the mean of the last 1000 values.

function standardDevThreshold (std) {

  return function (value, buffer) {

    var mean      = average(buffer)
    var dev       = stdev(buffer)
    var threshold = mean + std*dev

    if ((std > 0) && (value > threshold))
      return 1

    if ((std < 0) && (value < threshold))
      return 1

    return 0
  }
}


module.exports = function (s, b, stdev) {
  return s.combine(s.slidingWindow(b), standardDevThreshold(stdev))
}
