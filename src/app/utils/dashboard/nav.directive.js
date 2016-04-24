export function NavDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: `
      <md-sidenav ng-hide="vm.$ngmDashboard.isHideNav" class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')" layout="column">
        <md-toolbar layout="row" layout-align="center center">
          <md-button ui-sref="home">
            <span>App</span>
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
    `,
    controller: NavController,
    controllerAs: 'vm',
    bindToController: true,
    replace: true
  };

  return directive;
}

class NavController {
  constructor ($ngmDashboard) {
    'ngInject';

    this.$ngmDashboard = $ngmDashboard;
  }
}
