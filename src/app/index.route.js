import { routerConfig as adminRouterConfig } from './admin/admin.router'
import { routerConfig as maintenanceRouterConfig } from './maintenance/maintenance.router'
import { routerConfig as retailerRouterConfig } from './retailer/retailer.router'

export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  adminRouterConfig($stateProvider);
  maintenanceRouterConfig($stateProvider);
  retailerRouterConfig($stateProvider);

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/components/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'vm'
    })
  ;

  $urlRouterProvider.otherwise('/');
}

