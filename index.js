const express = require('express');
const app = express(); //is an instance of express

//configure route, the path is the route at which the callback function will be invoked
// GET method route
app.get('/', function(req, res){
    res.send('GET request to/Welcome to /');
});

//listen for connection on the given path (all paths on port 8080)
app.listen(8080, function(){
    console.log('Hello');
});
