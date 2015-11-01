var h = require('virtual-dom/h')

function spectrogram (list) {

  console.log(list[0])

  return h('h1',{ style: {
    'overflow': 'hidden'
    , 'padding-bottom': '10px'
   }
  }, list[0])
    
}


module.exports = spectrogram
