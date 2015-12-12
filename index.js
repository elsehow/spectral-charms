
module.exports = {

  patches: {
    SpikeDetector: require('./patches/SpikeDetector'),
  },

  views: {
    BarChart: require('./views/BarChart'),
    Histogram: require('./views/Histogram'),
    Log: require('./views/Log'),
  }

}
