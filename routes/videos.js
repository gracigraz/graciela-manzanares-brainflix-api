//import required modules
const express = require('express') //express to create the route
const router = express.Router() //router to create an instance of an express router used to define the routes
const fs = require('fs') //fs is the file system modules to read and wrtie files
const crypto = require('crypto') //import the built-in crypto module, to generate secure random number for unique video ID req

function readVideosFile() {
    console.log('gi3')
	const videoList = fs.readFileSync('./data/videos.json');
	const parsedData = JSON.parse(videoList);
	return parsedData;
}

//use the logMessage middleware for all routes - every request that matches any route defined after 
//router.use(logMessage) will first pass through the logMessage middleware, which logs the request details, 
//and then proceed to the appropriate route handler or middleware. 
router.use(logMessage);

// Define a route handler for the root URL ("/videos")
router.get('/', (req, res) => {
    // console.log(req)
    //Read videos data from a file (synchronous read for simplicity)
	const videos = readVideosFile(); 
    // console.log(res)
	res.json(videos) //If the reading is successful, the videos data is sent as a JSON response
	res.end()
})


// GET endpoint for an individual video
router.get("/:videoId", (req, res) => {
    // Read the file and find the single video whose id matches the requested id
    const videos = readVideosFile();
    console.log(videos)
    console.log(req.params)
    const singleVideo = videos.find((video) => video.id === req.params.videoId);
    console.log('this is ' +singleVideo)
    //check if the video was found 👀

    // Respond with the single video
    res.json(singleVideo);
});

// POST endpoint to add a new video to the list. 
//A unique id must be negerated for eacg video added
router.post("/", (req, res) => {    
    // Make a new video with a unique id
	console.log(req.body);

    const newVideo = {
        id: crypto.randomUUID(),
        title: req.body.title,
        description: req.body.description,
        updating: false,
    };

    // 1. Read the current videos array
    // 2. Add to the videos array
    // 3. Write the entire new videos array to the file
    const videos = readVideosFile();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    // Respond with the athlete that was created
    res.status(201).json(newVideo);
});





function logMessage(req, res, next) {
	console.log('hello from the videos route');
	next()
}

module.exports = router; //Export the router so that it can be used in other parts of the application