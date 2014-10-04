var fs = require('fs');
var path = require('path');

exports.sslOptions = {
  key: fs.readFileSync(path.join(__dirname, './ssl/server.key')).toString(),
  cert: fs.readFileSync(path.join(__dirname, './ssl/server.crt')).toString(),
  ca: fs.readFileSync(path.join(__dirname, './ssl/ca.crt')).toString(),
  requestCert: true,
  rejectUnauthorized: false
};