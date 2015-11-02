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

module.exports = function render (socket, draw) {

//  var stream = Faucet(socket, 'mindwave-raw-buffers')
//  var s = FFT(stream)
//  var a = Bandpass(s, 'alpha')
//  var b = Bandpass(s, 'gamma')
//
//  draw(a, BarGraph, 'spectrum 1')
//  draw(b, BarGraph, 'spectrum 2')

};
