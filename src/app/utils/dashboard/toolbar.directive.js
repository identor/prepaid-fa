export function ToolbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: `
      <md-toolbar ng-hide="vm.$ngmDashboard.isHideToolbar" layout="row" class="md-whiteframe-z1">
        <md-button id="main" class="menu" hide-gt-sm ng-click="vm.$ngmDashboard.toggleSidenav()" aria-label="Show User List">
          <md-icon>menu</md-icon>
        </md-button>
      </md-toolbar>
    `,
    controller: ToolbarController,
    controllerAs: 'vm',
    bindToController: true,
    replace: true
  };

  return directive;
}

class ToolbarController {
  constructor ($ngmDashboard) {
    'ngInject';

    this.$ngmDashboard = $ngmDashboard;
  }
}
