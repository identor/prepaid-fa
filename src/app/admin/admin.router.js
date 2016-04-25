export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('admin', {
      url: '/admin',
      template: `
        <md-sidenav md-theme="admin" class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')" layout="column">
          <md-toolbar layout="row" layout-align="center center">
            <img alt="{{ admin.user.email }}" ng-src="{{ admin.user.imageUrl }}">
            <div class="md-toolbar-tools">
              <h2>{{ admin.user.email.split('@')[0].substring(0, 20) }}</h2>
            </div>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="admin.$pfaUser.logout()">
              <md-icon>exit_to_app</md-icon>
            </md-button>
          </md-toolbar>
          <md-list>
            <md-list-item ng-click="true">
              <md-icon>people</md-icon>
              <p>Users</p>
            </md-list-item>
            <md-list-item ng-click="true">
              <md-icon>vpn_key</md-icon>
              <p>Change Password</p>
            </md-list-item>
          </md-list>
          <span flex></span>
        </md-sidenav>
        <div md-theme="admin"  flex layout="column" tabIndex="-1" role="main" class="md-whiteframe-z2">
          <md-toolbar ng-hide="vm.$ngmDashboard.isHideToolbar" layout="row" class="md-whiteframe-z1">
            <div class="md-toolbar-tools">
              <md-button id="main" class="menu" hide-gt-sm ng-click="admin.$ngmDashboard.toggleSidenav()" aria-label="Show Nav">
                <md-icon>menu</md-icon>
              </md-button>
              <span>Admin</span>
            </div>
          </md-toolbar>
          <md-content layout-padding>
            <md-list>
              <md-list-item ng-repeat="account in admin.accounts" class="noright">
                <img alt="{{ account.name }}" ng-src="{{ account.imageUrl }}" class="md-avatar" />
                <p><span>{{ account.mobile }}</span> - {{ account.name }} <strong ng-show="account.isLocked">(Locked)</strong></p>
                <md-button class="md-icon-button" ng-hide="account.isLocked" ng-click="admin.toggleLock($index)">
                  <md-icon>lock</md-icon>
                  <md-tooltip>Lock account</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" ng-show="account.isLocked" ng-click="admin.toggleLock($index)">
                  <md-icon>lock_open</md-icon>
                  <md-tooltip>Unlock account</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" ng-click="admin.showBalance($event, $index)">
                  <md-icon>attach_money</md-icon>
                  <md-tooltip>Account balance</md-tooltip>
                </md-button>
                <md-divider ng-if="!$last"></md-divider>
              </md-list-item>
            </md-list>
          </md-content>
        </div>
        <md-button md-theme="admin"  ng-click="admin.addUser(evt)" class="md-fab md-fab-bottom-right">
          <md-icon>add</md-icon>
        </md-button>
      `,
      controller: function ($ngmDashboard, $log, Firebase, $firebaseArray, firebaseUrl, $ngmUtilsDialog, $mdDialog, $pfaUser, $rootScope, $sessionStorage, $state) {
        'ngInject';

        this.user = $rootScope.user = $sessionStorage.user;

        if (!this.user || this.user.type !== 'admin') {
          $state.go('login');
          $state.go(this.user.type);
        }

        this.ref = new Firebase(firebaseUrl);
        this.accounts = $firebaseArray(this.ref.child('accounts'));
        this.purchases = $firebaseArray(this.ref.child('purchases'));

        this.onLogout = $rootScope.$on('logout', () => {
          this.accounts.$destroy();
          this.purchases.$destroy();
        });

        this.$ngmDashboard = $ngmDashboard;

        this.accounts.$loaded()
          .then(() => {
            this.purchases.$loaded()
              .then(() => {
                this.accounts.forEach((account, index) => {
                  let purchaseInstances = this.purchases.filter(purchase => {
                    return purchase.number === account.mobile;
                  });

                  let totalBal = purchaseInstances.map(purchase  => {
                    return purchase.amount;
                  }).reduce((prev, curr) => {
                    return prev + curr;
                  }, 0);

                  this.accounts[index].balance = totalBal;
                  this.accounts.$save(index);
                });
              });
          });

        this.$pfaUser = $pfaUser;

        this.addUser = (evt) => {
          $ngmUtilsDialog.show({
            title: 'Add user',
            template: `
              <md-input-container>
                <label>Mobile Number</label>
                <input type="number" ng-model="vm.obj.mobile" required>
              </md-input-container>
              <md-input-container>
                <label>Name</label>
                <input ng-model="vm.obj.name" required>
              </md-input-container>
            `,
            targetEvent: evt
          }).then(account => {
            account.imageUrl = `https://api.adorable.io/avatars/48/${account.mobile}`;
            account.balance = 0;
            this.accounts.$add(account);
          });
        };

        this.toggleLock = ($index) => {
          this.accounts[$index].isLocked = !this.accounts[$index].isLocked;
          this.accounts.$save($index);
        };

        this.showBalance = (evt, $index) => {
          let alert = $mdDialog.alert();

          alert
            .clickOutsideToClose(true)
            .title('Account balance')
            .textContent(`Balance in Php. is ${this.accounts[$index].balance}.`)
            .ok('Got it!')
            .targetEvent(evt);

          $mdDialog.show(alert);
        };
      },
      controllerAs: 'admin'
    })
  ;
}

