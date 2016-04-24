export class MainController {
  constructor ($ngmDashboard) {
    'ngInject';

    this.$ngmDashboard = $ngmDashboard;
    this.$ngmDashboard.fabOnClick = () => { $ngmDashboard.toggleNav() };
  }

  fabOnClick() {
  }
}

