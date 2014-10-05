var app = angular.module('app', ['app.controllers', 'ngRoute', 'ui.router', 'ngAnimate']);

app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
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
		
	});

	// .state('mod-restaurant.articles', {
	// 	url: '/mod-restaurant/articles',
	// 	templateUrl: 'partials/mod-restaurant/articles.html',
	// 	controller: 'ModRestaurantController'
	// })

	// .state('mod-restaurant.menus', {
	// 	url: '/mod-restaurant/menus',
	// 	templateUrl: 'partials/mod-restaurant/menus.html',
	// 	controller: 'ModRestaurantController'
	// })
 
	// .state('mod-gallery', { 
	// 	url: '/gallery',
	// 	templateUrl: 'partials/mod-gallery.html',
	// 	controller: 'ModGalleryController'
	// })
	// .state('mod-home', {
	// 	url: '/mod-home',
	// 	templateUrl: 'partials/mod-home.html',
	// 	controller: 'ModHomeController'
	// })
	// .state('mod-home.messages', {
	// 	url: '/mod-home/messages',
	// 	templateUrl: 'partials/mod-home/messages.html',
	// 	controller: 'ModHomeController'
	// }); 
	// .state('mod-home', {
	// 	url: '/mod-home',
	// 	templateUrl: 'partials/mod-home.html',
	// 	controller: 'ModHomeController'
	// });

}]); 