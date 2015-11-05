'use strict';

var mean = require('average')
var incrstdev = require( 'compute-incrmstdev')
var prop = function (p) { return function (x) { return x[p] } }

var patches = require('../..').patches
var views = require('../..').views

function greaterThanFifty (x) { 
  return x > 50 
}

function bpm (ibis) {
  return 60000 / mean(ibis)
}

module.exports = function render (socket, draw) {

  // make a fresh stream
  var stream = patches.Faucet(socket, 'heartrate')

  // get the inter-beat interval (IBI) from device
  var ibis = stream.map(prop('ibi')).map(Number).filter(greaterThanFifty)
  draw(ibis, Words, 'IBI')

  // calculate the BPMs
  var bpms = ibis.slidingWindow(10,10).map(bpm)
  draw(bpms, Words, 'bpm')

  // get the HRV - the std of the last n IBIs
  // there are many ways to get the HRV
  // see: https://en.wikipedia.org/wiki/Heart_rate_variability#Time-domain_methods
  var hrv = ibis.map(incrstdev(30))
  draw(hrv, Histogram, 'HRV')
  
  var hrvSpikes = SpikeDetector(hrv, 10, 2)
  draw(hrvSpikes, Histogram, 'HRV spikes.. (+2 std)')

}
