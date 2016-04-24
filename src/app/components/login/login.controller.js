export class LoginController {
  constructor ($pfaUser, $log, $state, $rootScope, $sessionStorage, $mdDialog) {
    'ngInject';

    this.$pfaUser = $pfaUser;
    this.$log = $log;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$sessionStorage = $sessionStorage;
    this.$mdDialog = $mdDialog;

    this.$rootScope.user = $sessionStorage.user;

    if (this.$rootScope.user) {
      this.$state.go($rootScope.user.type);
    }
  }

  login(evt) {
    this.isLoading = true;
    this.$pfaUser.login({
      email: this.email,
      password: this.password
    }).then(user => {
      this.$sessionStorage.user = this.$rootScope.user = user;
      this.$state.go(user.type);
    }).catch(() => {
      let alert = this.$mdDialog.alert()
        .title('Error')
        .textContent('Password or email address is not valid!')
        .targetEvent(evt)
        .ok('Ok')
      this.$mdDialog.show(alert);
      this.isLoading = false;
    });
  }
}

