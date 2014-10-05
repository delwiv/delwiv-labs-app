var app = angular.module('app.controllers');
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
				todoList.todos = fetchedTodos;
				// console.log(todoList);
			}).error(function(){});
		});
		controller.todoLists = lists;
	}).error(function(err){
		console.log(err);
	});
};

app.controller('TodoListController', [ '$http', function( $http ){
	var controller = this;

	controller.todoLists = [];
	controller.todoList = {};
	controller.newTodo = {};
	controller.todos = [];
	this.options = {
		displayListOrder: "created",
		displayListInvert: false,
		displayTodosOrder: "created",
		displayTodosInvert: false,
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
			
		}

		if(controller.options.displayTodosOrder == 'created') {

		} else if (controller.options.displayTodosOrder == 'modified') {

		}
		if(controller.options.displayTodosInvert) {

		}

		

	};
}]);
