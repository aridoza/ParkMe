const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const path = require("path");
const ObjectID = mongodb.ObjectID;

const SPACES_COLLECTION = "spaces";

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

const db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if(err){
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("Error: " + reason);
  res.status(code || 500).json({"error": message});
}


// All DB Routes :

app.get("/spaces", function(req, res) {
  db.collection(SPACES_COLLECTION).find({}).toArray(function(err, docs) {
    if(err) {
      handleError(res, err.message, "Failed to get contacts");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/spaces", function(req, res) {
  const newSpace = req.body;
  newSpace.createDate = new Date();

  if (!(req.body.username || req.body.location || req.body.time)) {
    handleError(res, "Unable to process, please try again", 400);
  }

  db.collection(SPACES_COLLECTION).insertOne(newSpace, function(err, doc) {
    if(err){
      handleError(res, err.message, "Failed to create new space");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
