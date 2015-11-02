'use strict';

// patches
var Faucet = require('./patches/Faucet.js')
//var Averager = require('./patches/Averager.js')
var Bandpass = require('./patches/Bandpass.js')
var FFT = require('./patches/FFT.js')

// views
var NumberView = require('./views/Number.js')
var BarGraph = require('./views/BarGraph.js')
var Spectrogram = require('./views/Spectrogram.js')

module.exports = function render (stream, draw) {

  var buffers = stream.map(function (b) { return b.rawBuffer })

  var s = FFT(buffers)

  var a = Bandpass('alpha', s)
  var b = Bandpass('beta', s)

  draw(a, BarGraph, 'alpha last spectrum')
  draw(a, Spectrogram, 'alpha spectra')
  draw(b, BarGraph, 'beta last spectrum')
  draw(b, Spectrogram, 'beta spectra')

};
