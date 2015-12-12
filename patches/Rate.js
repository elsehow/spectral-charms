// returns a stream of rate 
// in number of vals per s
function rate (s) {
  s.bufferBy(Kefir.interval(1000))
    .map(buff => buff.length)
}

module.exports = rate
