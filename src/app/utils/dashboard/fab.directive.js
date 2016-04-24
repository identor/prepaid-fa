export function FabDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: `
      <div ng-hide="vm.$ngmDashboard.isHideFab">
        <md-button ng-click="vm.doClick($event)" class="md-fab md-fab-bottom-right">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    `,
    controller: FabController,
    controllerAs: 'vm',
    bindToController: true,
    replace: true
  };

  return directive;
}

class FabController {
  constructor ($ngmDashboard) {
    'ngInject';

    this.$ngmDashboard = $ngmDashboard;
  }

  doClick(event) {
    return this.$ngmDashboard.getFabOnClick()(event);
  }
}
