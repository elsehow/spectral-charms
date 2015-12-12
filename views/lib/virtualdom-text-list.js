var h = require('virtual-dom/h')

function makeLog (opts) {

  var divHeight = 300
  if (opts && opts.divHeight)
    divHeight = opts.divHeight

  var divWidth = 300
  if (opts && opts.divWidth)
    divWidth = opts.divWidth

  var title = ''
  if (opts && opts.title)
    title = opts.title

  return (list) => {

    function item (i) {
      // if `i` is a list,
      if (i.length)
        // join it by commas
        i = i.join(',')
      // make each item in list into <p>i</p>
      return h('p', [i])
    }

    return h('div', { 
      style: {
         'overflow': 'scroll', 
         'font-size': '9pt', 
         'height': divHeight + 'px', 
         'max-width': divWidth + 'px', 
     }}, [
        h('h2', [title])
      , list.map(item)
    ])
  }
}

module.exports = makeLog