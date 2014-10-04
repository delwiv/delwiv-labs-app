var loopback = require('loopback'),
    app = loopback()
  , https = require('https')
  , sslConfig = require('./ssl-config')
  , server = https.createServer(sslConfig, app)
  , socket = require('socket.io');



var boot = require('loopback-boot');
var fs = require('fs');

// var server = http.createServer(app);
// var sslConfig = require('./ssl-config');
// var securedServer = https.createServer(sslConfig, app);


// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --

// boot scripts mount components like REST API
boot(app, __dirname);

app.use(loopback.cookieParser('secret'));
app.use(loopback.token({model: app.models.accessToken}));
app.enableAuth();

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');

// Angular main website
app.use(loopback.static(path.resolve(__dirname, '../client')));

// Project apps
// app.use(loopback.static(path.resolve(__dirname, '../apps')));


// Socket.io operation

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  server.listen('3033', function() {
    app.emit('started');
    console.log("Secured Express server listening on port 3000");
    initWebSocket();
  });
}



// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

initWebSocket = function() {
  var io = socket.listen(server)
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

};
