'use strict';

var _ = require('lodash')

// patches
var Faucet = require('../patches/Faucet.js')
var Bandpass = require('../patches/Bandpass.js')
var FFT = require('../patches/FFT.js')

// views
var Words = require('../views/Words.js')
var BarGraph = require('../views/BarGraph.js')
var Spectrogram = require('../views/Spectrogram.js')

module.exports = function render (socket, draw) {

  // make a fresh stream
  var stream = Faucet(socket, 'heartrate')

  var ibis = stream.map(function (d) { return d.ibi }).filter(function (x) {
    return x > 50
  })

  draw(ibis, Words, 'IBI')

  var bpms = ibis.slidingWindow(10,10).map(function (buff) {
    return 60000 / (_.sum(buff) / buff.length)
  })

  draw (bpms, Words, 'bpm')


//  var a = Bandpass(s, 'alpha')
//  var b = Bandpass(s, 'gamma')
//
//  draw(a, BarGraph, 'spectrum 1')
//  draw(b, BarGraph, 'spectrum 2')

};
