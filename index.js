module.exports = {

  charm: require('simple-charm'),

  patches: {
    SpikeDetector: require('./SpikeDetector')
  },

}
