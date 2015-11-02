var Kefir = require('kefir')

module.exports = function (socket, ev) {
  return Kefir.fromEvents(socket, ev)
}
