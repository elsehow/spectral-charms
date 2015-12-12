// returns a stream of rate 
// in number of vals per s
function rate (s) {
  var count = 0
  var time = 1000
  s.onValue(_ => count += 1)
  return Kefir.stream(emitter => {
    setInterval(_ => {
      emitter.emit(count)
      count = 0
    }, time)
  })
}

module.exports = rate