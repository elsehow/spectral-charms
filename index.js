
module.exports = {

  patches: {
    SpikeDetector: require('./patches/SpikeDetector'),
    Rate: require('./patches/Rate'),
  },

  views: {
    BarGraph: require('./views/BarGraph'),
    Histogram: require('./views/Histogram'),
    Log: require('./views/Log'),
  }

}
