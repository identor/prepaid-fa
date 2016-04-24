export class DialogUtilsService {
  constructor($log, $document, $mdDialog) {
    'ngInject'

    this.$log = $log;
    this.$document = $document;
    this.$mdDialog = $mdDialog;
  }

  show(config) {
    const $log = this.$log;
    const $document = this.$document;
    const $mdDialog = this.$mdDialog;

    var title = config.title || '';

    if (config.template) {
      var template = `
        <md-dialog aria-label="${title}" ng-cloak>
          <form ng-submit="vm.submit()">
            <md-toolbar>
              <div class="md-toolbar-tools">
                <h2 class="md-title">${title}</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="vm.cancel()">
                  <md-icon>close</md-icon>
                </md-button>
              </div>
            </md-toolbar>
            <md-dialog-content>
              <div class="md-dialog-content">
                ${config.template}
              </div>
            </md-dialog-content>
            <md-dialog-actions layout="row">
              <md-button type="submit">
                Submit
              </md-button>
            </md-dialog-actions>
          </form>
        </md-dialog>
      `;
    }

    return $mdDialog.show({
      controller: config.controller || DialogController,
      controllerAs: 'vm',
      parent: $document.body,
      template: template || `
        <md-dialog aria-label="${title}" ng-cloak>
          <form ng-submit="vm.submit()">
            <md-toolbar>
              <div class="md-toolbar-tools">
                <h2 class="md-title">${title}</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="vm.cancel()">
                  <md-icon>close</md-icon>
                </md-button>
              </div>
            </md-toolbar>
            <md-dialog-content>
              <div class="md-dialog-content" ng-include="'${config.templateUrl}'">
              </div>
            </md-dialog-content>
            <md-dialog-actions layout="row">
              <md-button type="submit">
                Submit
              </md-button>
            </md-dialog-actions>
          </form>
        </md-dialog>
      `,
      targetEvent: config.ev || null,
      locals: { $dialogData: config.data },
      clickOutsideToClose: true
    }).then((data) => {
      return data;
    }, error => {
      $log.debug(error);
    });
  }
}

class DialogController {
  constructor($mdDialog, $dialogData) {
    'ngInject';

    this.data = $dialogData;
    this.obj = {};
    this.$mdDialog = $mdDialog;
  }

  cancel() {
    const $mdDialog = this.$mdDialog;
    $mdDialog.cancel();
  }

  submit() {
    const $mdDialog = this.$mdDialog;
    $mdDialog.hide(this.obj);
  }
}

