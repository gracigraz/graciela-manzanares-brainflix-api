//import required modules to create a server that handles api reqeust and serves static files

const express = require('express'); //create an express app, used to create a server and handle http requests
const app = express(); //is an instance of express

require('dotenv').config();
const PORT =process.env.PORT;

const videos = require('./routes/videos') //module that defined routes related to videos.
const cors = require('cors') //this module enables Cross-Origin Resourse Sharing to allow different origins (domains) to access our server resources


// app.use(cors()) enable cors, this configures the CORS middleware to allow requests from any origin (*)
app.use(cors({
    origin: '*',
})
)

//This middleware parses incoming JSON data from requests and makes it available in req.body for easy access.
app.use(express.json());


//express static is a middleware function used to configure how express should handle 
//static files, this way we don't need to manually handle routing and serving of each static file in the app
app.use('/public-images', express.static('./public/images'));

//configure route, the path is the route at which the callback function will be invoked
// GET method route
app.get('/', (req, res)=>{
    console.log('Received a get request');
    res.send('GET request to.. the server is running')
});

//use the routes defined in the videosRoutes module under '/videos' route. 
app.use('/videos', videos);


//start the server - listen for connection on the given path (all paths on port 8080)
app.listen(PORT, ()=>{
    console.log('Server running on PORT ' + PORT);
});
