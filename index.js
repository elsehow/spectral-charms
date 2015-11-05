module.exports = {

  views: {
    Spectogram: require('./views/Spectrogram.js'),
    BarGraph: require('./views/BarGraph.js'),
    Words: require('./views/Words.js'),
    Histogram: require('./views/Histogram.js'),
  },

  patches: {
    Faucet: require('./patches/Faucet.js'),
    FFT: require('./patches/FFT.js'),
    SpikeDetector: require('./patches/SpikeDetector.js'),
  }

}
