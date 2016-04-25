export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('maintenance', {
      url: '/maintenance',
      template: `
        <md-sidenav md-theme="maintenance" ng-hide="vm.$ngmDashboard.isHideNav" class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')" layout="column">
          <md-toolbar layout="row" layout-align="center center">
            <img alt="{{ maintenance.user.email }}" ng-src="{{ maintenance.user.imageUrl }}">
            <div class="md-toolbar-tools">
              <h2>{{ maintenance.user.email.split('@')[0].substring(0, 20) }}</h2>
            </div>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="maintenance.$pfaUser.logout()">
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
        <div md-theme="maintenance" flex layout="column" tabIndex="-1" role="main" class="md-whiteframe-z2">
          <md-toolbar ng-hide="vm.$ngmDashboard.isHideToolbar" layout="row" class="md-whiteframe-z1">
            <div class="md-toolbar-tools">
              <md-button id="main" class="menu" hide-gt-sm ng-click="maintenance.$ngmDashboard.toggleSidenav()" aria-label="Show Nav">
                <md-icon>menu</md-icon>
              </md-button>
              <span>Maintenance</span>
            </div>
          </md-toolbar>
          <md-content layout-padding>
            <md-list>
              <md-list-item ng-repeat="user in maintenance.users" class="noright">
                <img alt="{{ user.email }}" ng-src="{{ user.imageUrl }}" class="md-avatar" />
                <p>{{ user.email }} - <strong>({{ user.type }})</strong></p>
                <md-button class="md-icon-button md-warn" ng-click="maintenance.deleteUser($event, $index)">
                  <md-icon>delete</md-icon>
                  <md-tooltip>Delete user</md-tooltip>
                </md-button>
                <md-divider ng-if="!$last"></md-divider>
              </md-list-item>
            </md-list>
          </md-content>
        </div>
        <md-button md-theme="maintenance" ng-click="maintenance.addUser(evt)" class="md-fab md-fab-bottom-right">
          <md-icon>add</md-icon>
        </md-button>
      `,
      controller: function ($ngmDashboard, $ngmUtilsDialog, Firebase, firebaseUrl, $firebaseArray, $firebaseAuth, $mdDialog, $pfaUser, $rootScope, $sessionStorage, $state) {
        'ngInject';

        this.user = $rootScope.user = $sessionStorage.user;

        if (!this.user || this.user.type !== 'maintenance') {
          $state.go('login');
          $state.go(this.user.type);
        }

        this.ref = new Firebase(firebaseUrl);
        this.users = $firebaseArray(this.ref.child('users'));
        this.auth = $firebaseAuth(this.ref);

        this.onLogout = $rootScope.$on('logout', () => {
          this.users.$destroy();
        });

        this.$pfaUser = $pfaUser;

        this.$ngmDashboard = $ngmDashboard;

        this.deleteUser = (evt, userIndex) => {
          let confirm = $mdDialog.confirm()
            .title('Delete user')
            .textContent('Are you sure you want to delete this user?')
            .targetEvent(evt)
            .ok('Ok')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(() => {
            this.users.$remove(userIndex);
          });
        }

        this.addUser = (evt) => {
          $ngmUtilsDialog.show({
            title: 'Add user',
            template: `
              <md-input-container>
                <label>Email</label>
                <input type="email" ng-model="vm.obj.email" required>
              </md-input-container>
              <md-input-container>
                <label>Password</label>
                <input type="password" ng-model="vm.obj.password" required>
              </md-input-container>
              <md-select name="vm.obj.type" ng-init="vm.obj.type='admin'" ng-model="vm.obj.type" placeholder="User type" required>
                <md-option value="maintenance">Maintenance</md-option>
                <md-option value="admin">Admin</md-option>
                <md-option value="retailer">Retailer</md-option>
              </md-select>
            `,
            targetEvent: evt
          }).then(user => {
            user.imageUrl = `https://api.adorable.io/avatars/48/${user.email}`;
            this.auth
              .$createUser(user)
              .then(userData => {
                this.users.$add({
                  uid: userData.uid,
                  email: user.email,
                  imageUrl: user.imageUrl,
                  type: user.type
                });
              }, () => {
                $ngmUtilsDialog.show({ title: 'Duplicate Error!', template: 'User already exists' });
              });
          });
        };
      },
      controllerAs: 'maintenance'
    })
  ;
}

