var main = require('main-loop')

// takes a function - this function should return virtual dom
// sets up a div on DOM element with ID 'views'  (charmer convention)
// and returns a function that a
function vdomView (fn) {
  // setup DOM
  var viewsEl = document.getElementById('views')
  var ourDiv = document.createElement('div')
  viewsEl.appendChild(ourDiv)
  // setup main-loop
  // `loop.update` will pass values to `makeGraph`
  var loop = main([], fn, require('virtual-dom'))
  // now add loop to div
  ourDiv.appendChild(loop.target)
  // retruns a function that tares down the view
  return {

    handler: (x) => loop.update(x),

    taredown: () => {
      ourDiv.remove()
      loop = null
    }
  }
}

module.exports = vdomView