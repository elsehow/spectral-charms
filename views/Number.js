var h = require('virtual-dom/h')

function number () {

  return function (list) {
    console.log(list[0])
    return h('h1',{ style: {
      'overflow': 'hidden'
      , 'padding-bottom': '10px'
     }
    }, list[0])
  }
    
}


module.exports = number
