
module.exports = {

  stream: require('./sources/kefir.js'),

  patches: {
    SpikeDetector: require('./patches/SpikeDetector'),
  },

  views: {
    BarChart: require('./views/BarChart')
  }

}
