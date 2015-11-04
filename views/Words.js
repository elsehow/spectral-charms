var h = require('virtual-dom/h')

function wordview () {

  return function (word) {
    w = JSON.stringify(word)
    return h('h1',{ style: {
      'overflow': 'hidden'
      , 'padding-bottom': '10px'
     }
    }, w)
  }
    
}


module.exports = wordview
