'use strict';

var _ = require('lodash')

function prop (p) {
  return function (x) {
    return x[p]
  }
}

// patches
var Faucet = require('../patches/Faucet.js')
var Bandpass = require('../patches/Bandpass.js')
var FFT = require('../patches/FFT.js')
var SpikeDetector = require('../patches/SpikeDetector.js')

// views
var Words = require('../views/Words.js')
var BarGraph = require('../views/BarGraph.js')
var Spectrogram = require('../views/Spectrogram.js')
var Histogram = require('../views/Histogram.js')

module.exports = function render (socket, draw) {

  // make a fresh stream
  var stream = Faucet(socket, 'heartrate')

  // get the inter-beat interval (IBI) from device
  var ibis = stream.map(prop('ibi')).map(Number).filter(function (x) {
    return x > 50
  })
  draw(ibis, Words, 'IBI')
  //draw(hrv, Histogram, 'IBI')

  // calculate the BPMs
  var bpms = ibis.slidingWindow(10,10).map(function (buff) {
    return 60000 / require('average')(buff)
  })
  draw(bpms, Words, 'bpm')

  // get the HRV - the std of the last n IBIs
  // there are many ways to get the HRV
  // see: https://en.wikipedia.org/wiki/Heart_rate_variability#Time-domain_methods
  var IBIwindow = 10
  var mstdev = require( 'compute-incrmstdev')(IBIwindow)
  var hrv = ibis.map(mstdev)
  draw(hrv, Histogram, 'HRV')
  
  var hrvSpikes = SpikeDetector(hrv, 10, 2)
  draw(hrvSpikes, Histogram, 'HRV spikes.. (+2 std)')

}
