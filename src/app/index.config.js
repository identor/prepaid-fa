export function config ($logProvider, $mdThemingProvider) {
  'ngInject';

  $logProvider.debugEnabled(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('teal');

  $mdThemingProvider.theme('retailer')
    .primaryPalette('green')
    .accentPalette('blue');

  $mdThemingProvider.theme('admin')
    .primaryPalette('blue')
    .accentPalette('amber');

  $mdThemingProvider.theme('maintenance')
    .primaryPalette('orange')
    .accentPalette('red');
}

