angular.module('app.controllers', [])

.controller('NodeChatController', [function(){
	console.log('Here is NodeChatController!');
}])

.controller('HomeController', ['$scope', function($scope){
	
}])

.controller('leftMenuController', ['$scope', '$location', function ($scope, $location) {
	var controller = this;
	$scope.menu = [];

	reloadMenu();

	$scope.$on('$locationChangeStart', function(){
		reloadMenu();
	});

	function reloadMenu() {
		console.log($location);
		switch ($location.path()){
			case '/app-node-chat':
			$scope.menu = {
				"title": "Node-chat",
				"description": "My first app made with node, please be indulgent ;)",
"entries": [
{
	"name": "Disconnect",
	"path": "home",
	"isState": true
},
{
	"name": "About",
	"path": "chat-node.about",
	"isState": true
},
{
	"name": "Get code!",
	"path": "github",
	"isUrl": true
}
]

};
break;

case '/home':
$scope.menu = {
	"title": "Home",
	"description": "Welcome on delwiv's website",
	"entries": [
	{
		"name": "Linkedin",
		"url": "http://fr.linkedin.com/in/lcathala/",
		"img": "img/linkedin-logo.png",
		"isUrl": true

	},
	{
		"name": "Doyoubuzz",
		"url": "http://www.doyoubuzz.com/louis-cathala",
		"img":"img/doyoubuzz-logo.png",
		"isUrl": true
	},
	{
		"name": "Github",
		"url": "https://github.com/delwiv",
		"img": "img/github-logo.png",
		"isUrl": true
	}
	]

};
break;
case '/app-angular-todolist':
$scope.menu = {
	"title": "AngularJS Todolist",
	"description": "This is my first AngularJS app, simple todolist",
	"entries": [
	{
		"name": "About",
		"path": "chat-node.about",
		"isState": true
	},
	{
		"name": "Get code!",
		"url": "github",
		"isUrl": true
	}
	]

};
break;

case '/dojo':
$scope.menu = {
	"title": "Dojo learning",
	"description": "This is where I'm learning Dojo"
	// "entries": [
	// {
	// 	"name": "About",
	// 	"path": "chat-node.about",
	// 	"isState": true
	// },
	// {
	// 	"name": "Get code!",
	// 	"url": "github",
	// 	"isUrl": true
	// }
	// ]

};
break;
};
};
}])

.controller('bodyController', ['$scope', function ($scope) {

}])
.controller('AngularTodolistController', ['$scope', function ($scope) {
	
}])

.controller('TodoListController', [ '$http', function( $http ){
	var controller = this;


	var apiUrl = "/api"

	fetchLists = function($http, controller){
		$http.get(apiUrl + '/TodoLists').success(function(data){
			console.log(data);
			var lists = data;

			angular.forEach(lists, function(todoList) {
				// console.log (todoList);
				$http.get(apiUrl + '/TodoLists/' + todoList.id + '/Todos')
				.success(function(fetchedTodos){
					// console.log(fetchedTodos);
					angular.forEach(fetchedTodos, function(current){
						if(!current.done){
							current.display = true;
						}
					});
					todoList.todos = fetchedTodos;
					controller.updateDisplay();
					// console.log(todoList);
				}).error(function(){});
			});
			controller.todoLists = lists;


		}).error(function(err){
			console.log(err);
		});
	};


	controller.todoLists = [];
	controller.todoList = {};
	controller.newTodo = {};
	controller.todos = [];
	this.options = {
		displayListOrder: "created",
		displayListInvert: false,
		// displayTodosOrder: "created",
		// displayTodosInvert: false,
		displayCheckedTodos: false
	};
	
	fetchLists($http, controller);
	
	this.createList = function(){
		controller.todoList.todos = [];
		controller.todoList.createdAt = Date.now();
		controller.todoList.modifiedAt = Date.now();
		$http.post(apiUrl + '/TodoLists', controller.todoList)
		.success(function(data){
			controller.todoLists.push(data);
		}).error(function(err){
			console.log(err);
		});
	}

	this.addTodo = function(todoList) {
		todoList.newTodo.listId = todoList.id;
		todoList.newTodo.createdAt = Date.now();
		todoList.newTodo.modifiedAt = Date.now();
		todoList.newTodo.done = false;
		todoList.newTodo.display = true;
		
		$http.post(apiUrl + '/TodoLists/' + todoList.id + '/Todos', todoList.newTodo)
		.success(function(data){
			todoList.todos.push(data);
			todoList.newTodo = {};
		}).error(function(err){
			console.log(err);
		});
	}; 

	this.updateList = function(todoList) {
		todoList.modifiedAt = Date.now();
		$http.put(apiUrl + '/TodoLists/' + todoList.id, todoList)
		.success(function(data){
			todoList.title = data.title;	
		}).error(function(err) {
			console.log(err);
		});
		
	};
	this.updateTodo = function(todo) {
		todo.modifiedAt = Date.now();
		$http.put(apiUrl + '/Todos/' + todo.id, todo)
		.success(function(data){
			todo = data;	
		}).error(function(err) {
			console.log(err);
		});
	};

	this.removeList = function(todoList){
		$http.delete(apiUrl + '/TodoLists/' + todoList.id)
		.success(function(data){
			var index = controller.todoLists.indexOf(todoList);
			controller.todoLists.splice(index, 1);
		}).error(function(err){
			console.log(err);
		});
	};

	this.emptyList = function(todoList){
		angular.forEach(todoList.todos, function(current){
			$http.delete(apiUrl + '/Todos/' + current.id)
			.success(function(data){
				todoList.todos = [];
			}).error(function(err){
				console.log(err);
			});
		});
	};
	this.updateDisplay = function(){
		console.log(controller.options);
		if(controller.options.displayListOrder == 'created') {
			controller.todoLists.sort(function(a, b) {
				return new Date(b.createdAt) - new Date(a.createdAt);
			});

		} else if (controller.options.displayListOrder == 'modified') {
			controller.todoLists.sort(function(a, b) {
				return new Date(b.modifiedAt) - new Date(a.modifiedAt);
			});
		}
		if(controller.options.displayListInvert) {
			controller.todoLists.reverse();
		}

		if(controller.options.displayCheckedTodos){
			angular.forEach(controller.todoLists, function(currentList){
				angular.forEach(currentList.todos, function(currentTodo){
					if(currentTodo.done){
						currentTodo.display = true;
					}
				})
			});
		} else {
			angular.forEach(controller.todoLists, function(currentList){
				angular.forEach(currentList.todos, function(currentTodo){
					if(currentTodo.done){
						currentTodo.display = false;
					}
				})
			});
		}

		// if(controller.options.displayTodosOrder == 'created') {

		// } else if (controller.options.displayTodosOrder == 'modified') {

		// }
		// if(controller.options.displayTodosInvert) {

		// }

		

	};
}]);
