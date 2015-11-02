var Kefir = require('kefir')

module.exports = function (event, socket) {
  return Kefir.fromEvents(event, socket)
}
