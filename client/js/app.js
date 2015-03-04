var app = angular.module('app', ['app.controllers', 'ngRoute', 'ui.router', 'ngAnimate']);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'leftMenuView': {
            templateUrl: 'views/left-menu-view.html',
            controller: 'leftMenuController as ctrl'
          },
          'bodyView': {
            templateUrl: 'views/home.html',
            controller: 'bodyController as ctrl'
          }
        }
      })

    .state('app-node-chat', {
      url: '/app-node-chat',
      views: {
        'leftMenuView': {
          templateUrl: 'views/left-menu-view.html',
          controller: 'leftMenuController as ctrl'
        },
        'bodyView': {
          templateUrl: 'apps/node-chat/app.html',
          controller: 'NodeChatController'
        }
      }

    })

    .state('app-angular-todolist', {
      url: '/app-angular-todolist',
      views: {
        'leftMenuView': {
          templateUrl: 'views/left-menu-view.html',
          controller: 'leftMenuController as ctrl'
        },
        'bodyView': {
          templateUrl: 'apps/angular-todolist/app.html',
          controller: 'AngularTodolistController'
        }
      }

    })

    .state('dojo', {
      url: '/dojo',
      views: {
        'leftMenuView': {
          templateUrl: 'views/left-menu-view.html',
          controller: 'leftMenuController as ctrl'
        },
        'bodyView': {
          templateUrl: 'apps/dojo/index.html',
          controller: 'dojoController as ctrl'
        }
      }
    });

  }
]);
