var _ = require('lodash')

var bands = [
  {
    name: 'delta'
  , min: 0
  , max: 3
  }
  , {
    name: 'theta'
  , min: 3
  , max: 7
  }
  , {
    name: 'alpha'
  , min: 8
  , max: 12
  }
  , {
    name: 'low-beta'
  , min: 13
  , max: 17
  }
  , {
    name: 'high-beta'
  , min: 18
  , max: 30
  }
  , {
    name: 'low-gamma'
  , min: 31
  , max: 40
  }
  , {
    name: 'mid-gamma'
  , min: 41
  , max: 50
  }
]

module.exports = function (stream, bandName) {

  // if there's a bandName, return just that band
  if (bandName) {
    var band = _.first(_.filter(bands, 'name', bandName))
    var bp = function (list) {
      return _.slice(list, band.min, band.max)
    }
  }

  // if no bandName passed in,
  // return a list of [ { name, list }]
  else {
    var bp = function (list) {
      return _.map(bands, function (band) {
        return {
          name: band.name,
          magnitudes: _.slice(list, band.min, band.max)
        }
      })
    }
  }

  return stream.map(bp)

}
  
