// Development server

var connect = require('connect');
var serveStatic = require('serve-static');

// Create server on port 5000
connect().use(
	serveStatic("app")
).listen(5000);

console.log("Server running at localhost:5000");
