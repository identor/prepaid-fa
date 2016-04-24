export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('admin', {
      url: '/admin',
      template: `
        <md-sidenav ng-hide="vm.$ngmDashboard.isHideNav" class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')" layout="column">
          <md-toolbar layout="row" layout-align="center center">
            <md-button ui-sref="home">
              <span>Admin</span>
            </md-button>
            <span flex></span>
            <md-button class="md-icon-button" ui-sref="login">
              <md-icon>exit_to_app</md-icon>
            </md-button>
          </md-toolbar>
          <md-list>
            <md-list-item ng-click="true">
              <md-icon>people</md-icon>
              <p>Users</p>
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
          <md-content layout-padding>
            <md-list>
              <md-list-item ng-repeat="account in admin.accounts" class="noright">
                <img alt="{{ account.name }}" ng-src="{{ account.img }}" class="md-avatar" />
                <p><span>+639069999333</span> - {{ account.name }} <strong ng-show="account.isLocked">(Locked)</strong></p>
                <md-button class="md-icon-button" ng-hide="account.isLocked">
                  <md-icon>vpn_key</md-icon>
                  <md-tooltip>Change password</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" ng-show="account.isLocked">
                  <md-icon>lock</md-icon>
                  <md-tooltip>Lock account</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" ng-hide="account.isLocked">
                  <md-icon>lock_open</md-icon>
                  <md-tooltip>Unlock account</md-tooltip>
                </md-button>
                <md-button class="md-icon-button">
                  <md-icon>attach_money</md-icon>
                  <md-tooltip>Account balance</md-tooltip>
                </md-button>
                <md-divider ng-if="!$last"></md-divider>
              </md-list-item>
            </md-list>
          </md-content>
        </div>
        <ngm-fab></ngm-fab>
      `,
      controller: function ($log, Firebase, $firebaseArray, firebaseUrl) {
        'ngInject';

        this.accounts = [
          {
            name: 'Irvin Denzel',
            img: 'http://lorempixel.com/64/64/business/3',
            isLocked: true
          },
          {
            name: 'Ydrian Rivera',
            img: 'http://lorempixel.com/64/64/people/2',
            isLocked: false
          },
          {
            name: 'Juan Dela Cruz',
            img: 'http://lorempixel.com/64/64/people/1',
            isLocked: true
          },
          {
            name: 'Juan Dela Cruz Two',
            img: 'http://lorempixel.com/64/64/people/5',
            isLocked: false
          },
          {
            name: 'R & R Law Group Inc.',
            img: 'http://lorempixel.com/64/64/business/2',
            isLocked: false
          }
        ];

        $log.debug('admin controller');
        var ref = new Firebase(firebaseUrl);
        var obj = $firebaseArray(ref);

        obj.$loaded(() => $log.debug(obj));
      },
      controllerAs: 'admin'
    })
  ;
}

