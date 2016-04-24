export function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('retailer', {
      url: '/retailer',
      template: `
        <md-sidenav ng-hide="vm.$ngmDashboard.isHideNav" class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')" layout="column">
          <md-toolbar layout="row" layout-align="center center">
            <md-button ui-sref="home">
              <span>Retailer</span>
            </md-button>
            <span flex></span>
            <md-button class="md-icon-button" ui-sref="login">
              <md-icon>exit_to_app</md-icon>
            </md-button>
          </md-toolbar>
          <md-list>
            <md-list-item ng-click="true">
              <md-icon>toc</md-icon>
              <p>Purchases</p>
            </md-list-item>
            <md-list-item ng-click="true">
              <md-icon>vpn_key</md-icon>
              <p>Change Password</p>
            </md-list-item>
          </md-list>
          <span flex></span>
        </md-sidenav>
        <div flex layout="column" tabIndex="-1" role="main" class="md-whiteframe-z2">
          <md-toolbar ng-hide="vm.$ngmDashboard.isHideToolbar" layout="row" class="md-whiteframe-z1">
            <md-button id="main" class="menu" hide-gt-sm ng-click="retailer.$ngmDashboard.toggleSidenav()" aria-label="Show User List">
              <md-icon>menu</md-icon>
            </md-button>
          </md-toolbar>
          <md-content layout-padding layout="column">
            <div layout="row">
              <strong flex="33">Mobile #</strong>
              <strong flex="33">Amount</strong>
              <strong flex="33">Date Purchased</strong>
            </div>
            <div ng-repeat="purchase in retailer.purchases" layout="row">
              <span flex="33">{{ purchase.number }}</span>
              <span flex="33">{{ purchase.amount }}</span>
              <span flex="33">{{ purchase.dateCreated | date:'yyyy-MM-dd HH:mm:ss' }}</span>
            </div>
          </md-content>
        </div>
        <md-button ng-click="retailer.addPurchase($event)" class="md-fab md-fab-bottom-right">
          <md-icon>add</md-icon>
        </md-button>
      `,
      controller: function ($ngmDashboard, $ngmUtilsDialog, Firebase, $firebaseArray, firebaseUrl) {
        'ngInject';

        this.ref = new Firebase(firebaseUrl);
        this.purchases = $firebaseArray(this.ref.child('purchases'));

        this.$ngmDashboard = $ngmDashboard;

        this.addPurchase = (evt) => {
          $ngmUtilsDialog.show({
            targetEvent: evt,
            title: 'Add purchase',
            template: `
              <md-input-container>
                <label>Mobile no.</label>
                <input ng-model="vm.obj.number" type="number" required>
              </md-input-container>
              <md-input-container>
                <label>Amount</label>
                <input ng-model="vm.obj.amount" type="number" required>
              </md-input-container>
            `
          }).then(purchase => {
            purchase.dateCreated = Firebase.ServerValue.TIMESTAMP;
            this.purchases.$add(purchase);
          });
        }
      },
      controllerAs: 'retailer'
    })
  ;
}

