import { DialogUtilsService } from './dialog-utils.service';
import { DashboardService } from './dashboard/dashboard.service';
import { NavDirective } from './dashboard/nav.directive';
import { ToolbarDirective } from './dashboard/toolbar.directive';
import { FabDirective } from './dashboard/fab.directive';

angular.module('ngmUtils', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'ngMaterial'
  ])
  .service('$ngmUtilsDialog', DialogUtilsService)
  .service('$ngmDashboard', DashboardService)
  .directive('ngmNav', NavDirective)
  .directive('ngmToolbar', ToolbarDirective)
  .directive('ngmFab', FabDirective)
;

