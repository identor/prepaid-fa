export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('maintenance', {
      url: '/maintenance',
      template: `
        <md-sidenav ng-hide="vm.$ngmDashboard.isHideNav" class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')" layout="column">
          <md-toolbar layout="row" layout-align="center center">
            <md-button ui-sref="home">
              <span>Maintenance</span>
            </md-button>
            <span flex></span>
            <md-button class="md-icon-button" ui-sref="login">
              <md-icon>exit_to_app</md-icon>
            </md-button>
          </md-toolbar>
          <md-list>
            <md-list-item ng-click="true">
              <md-icon></md-icon>
              <p>Menu Item</p>
            </md-list-item>
          </md-list>
          <span flex></span>
        </md-sidenav>
        <div flex layout="column" tabIndex="-1" role="main" class="md-whiteframe-z2">
          <md-toolbar ng-hide="vm.$ngmDashboard.isHideToolbar" layout="row" class="md-whiteframe-z1">
            <md-button id="main" class="menu" hide-gt-sm ng-click="vm.$ngmDashboard.toggleSidenav()" aria-label="Show User List">
              <md-icon>menu</md-icon>
            </md-button>
          </md-toolbar>
          <md-content>
            <pre>Retailer Route</pre>
          </md-content>
        </div>
        <ngm-fab></ngm-fab>
      `,
      controller: () => {
        'ngInject';
      },
      controllerAs: 'maintenance'
    })
  ;
}

