var h = require('virtual-dom/h')

function wordview () {

  return function (word) {
    return h('h1',{ style: {
      'overflow': 'hidden'
      , 'padding-bottom': '10px'
     }
    }, word)
  }
    
}


module.exports = wordview
