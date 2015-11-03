'use strict';

// patches
var Faucet = require('../patches/Faucet.js')
//var Averager = require('../patches/Averager.js')
var Bandpass = require('../patches/Bandpass.js')
var FFT = require('../patches/FFT.js')

// views
var Words = require('../views/Words.js')
var BarGraph = require('../views/BarGraph.js')
var Spectrogram = require('../views/Spectrogram.js')

module.exports = function (socket, draw) {

  var neurosky = Faucet(socket, 'mids-mindwave-playback')
  var events = Faucet(socket, 'mids-events-playback').map(function (x) { return x['event name'] })
  events.log()

  draw(events, Words, 'events')

  var raws = neurosky.map(function (b) { return b.raw_values })

  var s = FFT(raws)
  draw(s, BarGraph, 'spectrum 1')

//  var a = Bandpass(s, 'alpha')
//  var b = Bandpass(s, 'gamma')
//
//  draw(a, BarGraph, 'spectrum 1')
//  draw(b, BarGraph, 'spectrum 2')

}
