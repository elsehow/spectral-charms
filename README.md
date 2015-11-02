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
