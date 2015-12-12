
module.exports = {

  patches: {
    SpikeDetector: require('./patches/SpikeDetector'),
  },

  views: {
    BarGraph: require('./views/BarGraph'),
    Histogram: require('./views/Histogram'),
    Log: require('./views/Log'),
  }

}
