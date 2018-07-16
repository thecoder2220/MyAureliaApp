/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import {Aurelia} from 'aurelia-framework';
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import authConfig from './authConfig';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({warnings: {wForgottenReturn: false}});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use
  /* Your other plugins and init code */

  /* setup the api endpoints first */
    .plugin('aurelia-api', configure => {
      configure
        .registerEndpoint('auth', 'https://myapi.org/auth')
        .registerEndpoint('protected-api', 'https://myapi.org/protected-api')
        .registerEndpoint('public-api', 'http://myapi.org/public-api');
      .
      setDefaultEndpoint('auth');
    })

    /* configure aurelia-authentication to use above aurelia-api endpoints */
    .plugin('aurelia-authentication', baseConfig => {
      baseConfig.configure({
        endpoint: 'auth',                   // '' for the default endpoint
        configureEndpoints: ['auth', 'api'] // '' for the default endpoint
      });

      /* At this point, baseConfig.client is the aurelia-api Rest client from the 'auth' endpoint. The HttpClient is baseConfig.client.client */
    });

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
