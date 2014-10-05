var loopback  = require('loopback');
var app       = loopback();
var https     = require('https');
var sslConfig = require('./ssl-config');
var server    = https.createServer(sslConfig, app);
var socket    = require('socket.io');
var boot      = require('loopback-boot');
var fs        = require('fs');
// var http      = require('http');

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

// set up a route to redirect http to https
// http.get('http://delwiv-labs.ovh'
//     ,function(req,res){  
//     res.redirect('https://delwiv-labs.ovh'+req.url)
// });

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
  // var unsecuredServer = http.createServer();
  // unsecuredServer.listen('3000');
  server.listen('3033', function() {
    app.emit('started');
    console.log("Secured Express server listening on port 3033");
    initWebSocket();
  });
}



// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

getDate = function(){
      return new Date().toLocaleTimeString();
    }

initWebSocket = function() {
  var io = socket.listen(server);

  eval(fs.readFileSync(path.resolve(__dirname,
    '../client/apps/node-chat/javascript/User.js')).toString());

  var users = [];

  io.on('connection', function(socket){
    // console.log('a user connected');
    
    io.to(socket.id).emit('chat message', 'Delwiv', getDate(), 'Welcome on my node.js chat.');    
    
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
      
      io.emit('chat message', userName, getDate(), msg);
      updateClients();
    });

    

    updateClients = function(){
      io.emit('update', users);
    }

    socket.on('changeUsername', function(user){
      for( var i = 0; i < users.length; i++ ){
        if(users[i].id === user.id){
          socket.emit('chat message', users[i].name, 'Info : ' + users[i].name + ' is no known as ' + user.name + '.');
          users[i].name = user.name; 
        }
      }
      updateClients();
    });

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
