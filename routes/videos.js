//import required modules
const express = require('express') //express to create the route
const router = express.Router() //router to create an instance of an express router used to define the routes
const fs = require('fs') //fs is the file system modules to read and wrtie files

function readVideosFile() {
	const videoList = fs.readFileSync('./data/videos.json')
	const parsedData = JSON.parse(videoList)
	return parsedData
}

//use the logMessage middleware for all routes - every request that matches any route defined after 
//router.use(logMessage) will first pass through the logMessage middleware, which logs the request details, 
//and then proceed to the appropriate route handler or middleware. 
router.use(logMessage)

// Define a route handler for the root URL ("/videos")
router.get('/', (req, res) => {
    // Read videos data from a file (synchronous read for simplicity)
	const videos = readVideosFile() 
	res.json(videos) //If the reading is successful, the videos data is sent as a JSON response
	res.end()
})


// GET endpoint for an individual video
router.get("/:videoId", (req, res) => {
    // Read the file and find the single video whose id matches the requested id
    const videos = readVideosFile();
    const singleVideo = videos.find((video) => video.id === req.params.videoId);

    // This might be a good place to check if the athlete was found 👀

    // Respond with the single video
    res.json(singleVideo);
});



function logMessage(req, res, next) {
	console.log('hello from the videos route');
	next()
}

module.exports = router; //Export the router so that it can be used in other parts of the application