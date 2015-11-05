'use strict';

var _ = require('lodash')
 , mean = require('average')

// patches
var views = require('../..')
var patches = require('../..')

// my patches
var Bandpass = require('./patches/Bandpass')

module.exports = function render (socket, draw) {

  // experiment 1
  //
  //    compare my eeg band calculations to neurosky's
  //

  // make a fresh stream
  var ns   = patches.Faucet(socket, 'mids-mindwave-playback')
  var evs  = patches.Faucet(socket, 'mids-event-playback')

  // announce event names
  var eventNames = evs.map(_.property('event name')) 
  draw(eventNames, views.Words, 'events')

  // get eeg power from neurosky device..
  var eegPower = ns.map(_.property('eeg_power'))
  draw(eegPower, views.BarGraph, 'ns eeg power')

  // make my own EEG power reading!
  var buffers = ns.map(_.property('raw_values'))
  var ffts    = patches.FFT(buffers)
  var bands   = Bandpass(ffts).map(function (bp) {
    var mags = _.pluck(bp, 'magnitudes')
    return _.map(mags, average)
  })
  draw(bands, BarGraph, 'my eeg power')

  // make a ratio of alpha to beta power
  function ratio (a, b) { return mean(a) / mean(b) }
  var a = ffts.map(Bandpass('alpha')),
  var b = ffts.map(Bandpass('low beta'))
  var alphaBeta = Kefir.combine([a,b], ratio))
  draw(alphaBeta, Histogram, 'alpha beta ratio')

}
