# spectral charmer

live-code with your biosignals 

## How it works

### special-charm

[special-charm](http://npmjs.com/package/special-charm) lets you live-code with event-emitters. it sits at the core of spectral charmer.

### logging

from your app.js, return a list like this:

    module.exports = (stream) => {
      
      var ffts = stream.slidingWindow(512).map(fft)
    
      return [ffts, 'FFTs']
    }

now, every value in ffts will get saved to a log in ./charmer-logs/FFTs

### graphing in the command line

graphing is 1 step fancier.

....



## TODOS

there is some state i'd love to persist -- for example, the historical data on grahs.  
can the view and stream logic be separated such that updating one won't mess with the other?
that would version to 0.1.0

