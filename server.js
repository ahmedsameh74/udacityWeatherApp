// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// const { request } = require('http');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5500;
const server = app.listen(port , listening);
function listening(){console.log('server')};


app.get("/getData",(req,res) => {
res.send(projectData);
// projectData = {};
})


app.post("/postData", (req,res) => {
    newData = {
        temp: req.body.temperature,
        date: req.body.date,
        content: req.body.content,
        city: req.body.city
    };
    projectData = newData;
    // res.send(projectData);
    console.log(projectData)

    

})