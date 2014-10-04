angular.module('app.controllers', [])

.controller('NodeChatController', [function(){
	console.log('Here is NodeChatController!');
}])

.controller('HomeController', ['$scope', function($scope){
	$scope.message = "Here will be hosted my personal projects so you can see what I do.";
}])