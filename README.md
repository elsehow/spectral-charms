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

contact @elsehow if you want access to the [BioSENSE](http://biosense.berkeley.edu) group's indra node.

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

there is some state i'd love to persist -- for example, the historical data on grahs.  
can the view and stream logic be separated such that updating one won't mess with the other?

ideally i'd like to run this application with something like

   spectral-charm my-app.js

where my-app exposes the right function
is there a good way to simulate this in development?
that way, we can keep examples data / deps tidy from the main spectral-charm project. much easier. (housekeeping - do first)
