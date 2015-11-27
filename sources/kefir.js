var Kefir = require('kefir')

module.exports = function (em, ev) {
  return {
    em: em,
    ev: ev,
    fn: function (em, ev) {
      return Kefir.fromEvents(em, ev)
    }
  }
}
