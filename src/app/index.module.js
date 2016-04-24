'use strict';

// Angular Modules
import './utils';

import * as moment from 'moment';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { LoginController } from './components/login/login.controller';
import { UserService } from './components/login/user.service.js';

angular.module('prepaidFa', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'ngMaterial',
    'firebase',
    'ngmUtils',
    'ngStorage'
  ])
  .constant('firebaseUrl', 'https://prepaid-fa.firebaseio.com')
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .service('$pfaUser', UserService)
;

