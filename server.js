
const express = require("express");
const app = express();
const bodyParser = require("body-Parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Cors = require("cors");
app.use(Cors());
projectData = {};
app.use(express.static('website'));
let doMost = (req,res) => res.status(200).send(projectData);
app.get("/all",doMost);

let make = (req,res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
app.post("/add",make);
const port = 4000;
let server = "127.0.0.1";

let testing = () =>
console.log(`server running at http://${server}:${port}`);
app.listen(port,testing);

app.get('/getRequest',getData); 
function getData (req,res){
    res.send(projectData);
}

app.post('/temp',temp);
function temp(req,res){
    projectData={
        temp:req.body.temp,
        city:req.body.city,
        date:req.body.date,
        content:req.body.content
    }
    res.send(projectData);
}
