'use strict';

var _ = require('lodash')

function prop (n) {
  return function (x) {
    return x[n]
  }
}

function average (list) {
  return _.sum(list) / list.length
}

// patches
var Faucet = require('../patches/Faucet.js')
//var Averager = require('../patches/Averager.js')
var Bandpass = require('../patches/Bandpass.js')
var FFT = require('../patches/FFT.js')

// views
var Words = require('../views/Words.js')
var BarGraph = require('../views/BarGraph.js')
var Spectrogram = require('../views/Spectrogram.js')

module.exports = function render (socket, draw) {

  // experiment 1
  //
  //    compare my eeg band calculations to neurosky's
  //

  // make a fresh stream
  var ns   = Faucet(socket, 'mids-mindwave-playback')
  var evs  = Faucet(socket, 'mids-event-playback')

  // announce event names
  var eventNames = evs.map(prop('event name')) 
  evs.log()
  draw(eventNames, Words, 'events')

  // get eeg power from neurosky device..
  var eegPower = ns.map(prop('eeg_power'))
  draw(eegPower, BarGraph, 'ns eeg power')

  // make my own EEG power reading!
  var buffers = ns.map(prop('raw_values'))
  var ffts    = FFT(buffers)
  var a       = Bandpass(ffts).map(function (bp) {
    var mags = _.pluck(bp, 'magnitudes')
    return _.map(mags, average)
  })
  draw(a, BarGraph, 'my eeg power')

}
