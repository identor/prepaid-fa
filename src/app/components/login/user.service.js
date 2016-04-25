export class UserService {
  constructor(Firebase, $firebaseArray, $firebaseAuth, $q, firebaseUrl, $state, $rootScope, $sessionStorage) {
    'ngInject';

    this.ref = new Firebase(firebaseUrl);
    this.auth = $firebaseAuth(this.ref);

    this.$q = $q;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$sessionStorage = $sessionStorage;
    this.$firebaseArray = $firebaseArray;
  }

  getUser() {
    return this.$q((resolve, reject) => {
      return this.auth.$onAuth(authData => {
        if (authData) {
          return this.resolveUser(authData.uid).then(resolve, reject);
        } else {
          return reject(new ReferenceError('Auth Data not available'));
        }
      });
    });
  }

  findUser(email) {
    return this.users.$loaded(users => {
      return users.filter(user => {
        return user.email === email;
      })[0];
    });
  }

  resolveUser(uid) {
    return this.$q((resolve, reject) => {
      this.users.$loaded(users => {
        let result = users.find(user => {
          return user.uid === uid;
        });

        if (result) {
          resolve(result);
        } else {
          reject(new ReferenceError('User not found'));
        }
      });
    });
  }

  /**
   * Initial login implementation, TODO: implement authentication using
   * username.
   */
  login(loginInfo) {
    return this.auth.$authWithPassword({
      email: loginInfo.email,
      password: loginInfo.password
    }).then(authData => {
      this.users = this.$firebaseArray(this.ref.child('users'));
      this.onLogout = this.$rootScope.$on('logout', () => {
        this.users.$destroy();
      });

      return this.resolveUser(authData.uid);
    });
  }

  logout() {
    this.auth.$unauth();
    this.$sessionStorage.user = this.$rootScope.user = null;
    this.$state.go('login');
    this.$rootScope.$broadcast('logout');
  }
}

