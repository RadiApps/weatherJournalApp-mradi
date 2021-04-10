// Setup empty JS object to act as endpoint for all routes
projectData={};
const port=4000
// Express to run server and routes
const express=require("express");
//its middle ware to parse response body from calling endpoints
const bodyParser=require("body-parser");
//its allow communication across the web
const cors=require("cors");
// Start up an instance of app
const app=express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Callback to debug
app.listen(port, ()=> {
    console.log("Your server is started into port number : "+port);
})
// Initialize all route with a callback function
app.get("/getWeather",(req,res)=>{
    res.send(projectData);
})
app.post("/addWeather",(req,res)=>{
    let d = req.body;
    projectData['date']=d.date;
    projectData['temp']=d.temp;
    projectData['feelings']=d.feelings;
    res.send("Post received");
})
  