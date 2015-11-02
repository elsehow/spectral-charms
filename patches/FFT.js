var fftjs = require('fft-js')
  , fft = fftjs.fft
  , fftMag = fftjs.util.fftMag
  , magnitudes = function (vs) { return fftMag(fft(vs)) }

module.exports = function (stream) {
  return stream.map(magnitudes)
}

