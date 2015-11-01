var io = require('socket.io-client')
var socket = io('http://indra.webfactional.com/')

module.exports = function () {
  return socket
}

