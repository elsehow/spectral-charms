'use strict';

// patches
var Faucet = require('../patches/Faucet.js')
//var Averager = require('../patches/Averager.js')
var Bandpass = require('../patches/Bandpass.js')
var FFT = require('../patches/FFT.js')

// views
var NumberView = require('../views/Number.js')
var BarGraph = require('../views/BarGraph.js')
var Spectrogram = require('../views/Spectrogram.js')

module.exports = function render (socket, draw) {

  // make a fresh stream
  var stream = Faucet(socket, 'mindwave-raw-buffers')

  var buffers = stream.map(function (b) { return b.rawBuffer })

  var s = FFT(buffers)
  draw(s, BarGraph, 'spectrum 1')

  var a = Bandpass(s, 'alpha')
  draw(a, Spectrogram, 'alpha')
  
  var b = Bandpass(s, 'beta')
  draw(b, Spectrogram, 'beta')

};
