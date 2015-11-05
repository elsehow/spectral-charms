# spectral charmer

live-code with your biosignals 

## Running the examples

To install and run:

    npm install

    npm start

[package.json]: ./package.json
[render.js]: ./render.js
[browser.js]: ./browser.js

## How it works

## indra

if you can feed your data through the indra system, you can use spectral-charmer right out of the box.

check the [indra-server](https://github.com/indra-net/collection-server) project here for more information.

if you want access to the [BioSENSE](http://biosense.berkeley.edu) group's indra node, contract nick@ischool.berkeley.edu

### webpack
We use browserify-hmr with watchify.
We use [http-server][] to host our example. 
When browserify-hmr a file has changed, `module.hot.accept` gets a chance to 'claim' the reload and prevent the page from refreshing as it usually would.
We use that opportunity to replace the function the app uses to render.
We have to be careful to not reseat any references - so we pass a function that doesn't change to `hg.app` (i.e. `App.render`), but inside that function, we call a function which may change at runtime.

Credit to [raynos](http://github.com/raynos) for this very clever trick.

[hot module replacement]: https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack
[http-server]: https://github.com/indexzero/http-server
[browserify-hmr]: https://github.com/AgentME/browserify-hmr


## todos

### immediately: 

ideally i'd like to run this application with something like

   var charmer = require('spectral-charmer')

   charmer.setup(app)

where `app` exposes the right kinda function

and, app should be able to use modules we give them

and mix-and-match easily with their own modules

   var charmer  = require('spectral-charmer')
   var patches  = charmer.patches
   var views    = charmer.views

   var ffts     = stream.map(patches.FFT)
   var alpha    = stream.map(Bandpass('alpha')).draw(views.Spectrogram, 'alpha waves')

so, this repository should be organized with an npm file

FIX:

`npm init` in the root again, make a new directory for each example, `npm init` in each, and make a generic readme for each

refactor spectral-charmer into a module, like mercury.

version to 0.0.3

### later on:

there is some state i'd love to persist -- for example, the historical data on grahs.  
can the view and stream logic be separated such that updating one won't mess with the other?

version to 0.1.0

