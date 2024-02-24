const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const process = require('process');
const rootDir = process.cwd();


let userController = require(rootDir + "/classes/controllers/UserController.js");
let exerciseController = require(rootDir + "/classes/controllers/ExerciseController.js");

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req, res) => {
  let userObjBody = req.body;
  let result = await userController.insertUser(userObjBody);
  res.send(result);
});

app.get('/api/users', async (req, res) => {
  let results = await userController.getAllUsers();
  res.send(results);
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  let id = req.params._id;
  let exerciseData = req.body;
  exerciseData._id = id;
  let result = await exerciseController.insertExercise(exerciseData);
  res.send(result);
});

app.get('/api/users/:_id/logs', async (req, res) => {
  let userID = req.params._id;
  let from = (Boolean(req.query.from)) ? new Date(req.query.from).getTime() : 0;
  let to = (Boolean(req.query.to)) ? new Date(req.query.to).getTime() : Number.MAX_SAFE_INTEGER;
  let limit = parseInt(req.query.limit || '0');
  let resultExcs = await exerciseController.readAndCountAllExercisesByUserID(userID,from,to,limit);
  let resultUser = await userController.getUserByID(userID);
  let concatedResult = { ...resultUser, ...resultExcs };
  res.send(concatedResult);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
