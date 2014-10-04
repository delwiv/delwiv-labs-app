var socket = require('socket.io');
var app = require('./server');

var io = module.exports = socket.listen(app.server);

io.on('connection', function(socket){
    // console.log('a user connected');

    socket.on('addUser', function(user){
	    	// socket.user = userName;
	    	console.log(user.name + ' has joined.');
	    	user.id = socket.id;
	    	users.push(user);
	    	console.log(users);
	    	socket.emit('chat message', user.name, new Date().toLocaleTimeString(),  'Welcome on delwiv\'s first nodejs app. You may find it better with friends ;)');
	    	socket.broadcast.emit('chat message', user.name, new Date().toLocaleTimeString(), 'Info : ' + user.name + ' has joined the chat.');
	    	updateClients();
	    });
 

    socket.on('state changed', function(user){
    	console.log('state changed: ' + user.name + ' : ' + user.status);
    	users[getIndex(users, user.name)].status = user.status;
    	updateClients();    	
    });

    socket.on('chat message', function(userName, msg){
    	console.log('message from ' + userName + ' : ' + msg);
    	users[getIndex(users, userName)].status = "inactive";
    	var date = new Date().toLocaleTimeString();
    	io.emit('chat message', userName, date, msg);
    	updateClients();
    });

    updateClients = function(){
    	io.emit('update', users);
    }

    socket.on('disconnect', function(){
    	debugger;
    	console.log('user ' + socket.id + ' left.');
    	for( var i = 0; i < users.length; i++ ){
    		if(users[i].id === socket.id){
    			socket.broadcast.emit('chat message', users[i].name, 'Info : ' + users[i].name + ' has left the chat.');
    			users.splice(i, 1);
    		}
    	}
    	updateClients();
    });
});