var app = angular.module('app', ['app.controllers', 'ngRoute', 'ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');

	$stateProvider  
	.state('home', {
		url: '/home',
		templateUrl: 'views/home.html',
		controller: 'HomeController as ctrl'
	})

	.state('app-node-chat', {
		url: '/app-node-chat',
		templateUrl: 'apps/node-chat/app.html',
		controller: 'NodeChatController'
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