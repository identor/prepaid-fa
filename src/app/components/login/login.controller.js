export class LoginController {
  constructor ($pfaUser, $log, $state, $rootScope) {
    'ngInject';

    this.$pfaUser = $pfaUser;
    this.$log = $log;
    this.$state = $state;
    this.$rootScope = $rootScope;

    if (this.$rootScope.user) {
      this.$state.go($rootScope.user.type);
    }
  }

  login() {
    this.isLoading = true;
    this.$pfaUser.login({
      email: this.email,
      password: this.password
    }).then(user => {
      this.$rootScope.user = user;
      this.$state.go(user.type);
    }).catch(error => {
      this.$log.error(error);
    });
  }
}

