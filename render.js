'use strict';
var fftjs = require('fft-js')
  , fft = fftjs.fft
  , fftMag = fftjs.util.fftMag
  , magnitudes = function (vs) { return fftMag(fft(vs)) }

// patches
//var Averager = require('./patches/Averager.js')
var Bandpass = require('./patches/Bandpass.js')

// views
var NumberView = require('./views/Number.js')
var BarGraph = require('./views/BarGraph.js')
var Spectrogram = require('./views/Spectrogram.js')

module.exports = function render (stream, draw) {

  var buffers = stream.map(function (b) { return b.rawBuffer })
  var ffts = buffers.map(magnitudes)

  var a = ffts.map(Bandpass('alpha'))
  var b = ffts.map(Bandpass('beta'))

  draw(a, BarGraph, 'alpha last spectrum')
  draw(a, Spectrogram, 'alpha spectra')
  draw(b, BarGraph, 'beta last spectrum')
  draw(b, Spectrogram, 'beta spectra')

};
