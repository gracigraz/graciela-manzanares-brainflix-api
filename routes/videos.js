//import required modules
const express = require("express"); //express to create the route
const router = express.Router(); //router to create an instance of an express router used to define the routes
const fs = require("fs"); //fs is the file system module to read and wrtie files
const crypto = require("crypto"); //import the built-in crypto module, to generate secure random number for unique video ID req

function readVideosFile() {
  const videoList = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videoList);
  return parsedData;
}

//use the logMessage middleware for all routes
router.use(logMessage);

// Define a route handler for the root URL ("/videos")
router.get("/", (req, res) => {
  //Read videos data from a file (synchronous read for simplicity)
  const videos = readVideosFile();
  res.json(videos); //If the reading is successful, the videos data is sent as a JSON response
  res.end();
});

// GET endpoint for an individual video
router.get("/:id", (req, res) => {
  // Read the file and find the single video whose id matches the requested id
  const videos = readVideosFile();
  const singleVideo = videos.find((video) => video.id === req.params.id);
  // Respond with the single video
  res.json(singleVideo);
});

// POST endpoint to add a new video to the list. A unique id must be negerated for eacg video added.
router.post("/", (req, res) => {
  // Make a new video with a unique id

  let randomLikes = (Math.floor(Math.random() * 1000000) + 1000).toLocaleString(
    "en-US"
  );

  let randomViews = (Math.floor(Math.random() * 1000000) + 1000).toLocaleString(
    "en-US"
  );

  let randomDate = new Date(
    Math.random() * new Date().getTime()
  ).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  generateRandomText = (numWords) => {
    const loremWords =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const loremText = loremWords.split(" ");
    const randomText = [];
    while (randomText.length < numWords) {
      const randomIndex = Math.floor(Math.random() * loremText.length);
      randomText.push(loremText[randomIndex]);
    }
    return randomText.join(" ");
  };
  const generateRandomComments = () => {
    let comments = [];
    let numComments = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < numComments; i++) {
      let obj = {
        id: crypto.randomUUID(),
        name: generateRandomText(2),
        comment: generateRandomText(30),
        timestamp: new Date(
          Math.random() * new Date().getTime()
        ).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
      };
      comments.push(obj);
    }
    return comments;
  };
  //new video with unique id
  const newVideo = {
    id: crypto.randomUUID(),
    title: req.body.title,
    channel: generateRandomText(3),
    image: "http://localhost:8082/public-images/Upload-video-preview.jpg",
    description: req.body.description,
    views: randomViews,
    likes: randomLikes,
    timestamp: randomDate,
    comments: generateRandomComments(),
  };

  // Read the current videos array, add to the videos array, write the entire new videos array to the file
  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  // Respond with the video that was created
  res.status(201).json(newVideo);
});

function logMessage(req, res, next) {
  next();
}

module.exports = router; //Export the router so that it can be used in other parts of the application
