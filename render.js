'use strict';
var fftjs = require('fft-js')
  , fft = fftjs.fft
  , magnitudes = function (raws) { return fftjs.util.fftMag(fft(raws)) }

var NumberView = require('./views/Number.js')
var Spectrogram = require('./views/Spectrogram.js')

module.exports = function render (stream, draw) {
  var buffers = stream.map(function (b) { return b.rawBuffer })
  var ffts = buffers.map(magnitudes)

  draw(ffts, Spectrogram, 'FFT')
};
