"use strict";

// Basic express setup:
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const server = require("http").createServer(app);
const createDataHelper = require("./lib/data-helpers-mongo.js");
const createTweetsRoutes = require("./routes/tweets");
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Cleanup code
function cleanup(serverExpress, mongoDB) {
  return function() {
    console.log("Shutting down server...");
    serverExpress.close();
    console.log("Shutting down DB connection");
    mongoDB.close();
    console.log("Shutdown Complete.");
  };
}

// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");
MongoClient.connect(MONGODB_URI, (err, dbase) => {
  if (err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  db = dbase;
  // require it and pass the `db` parameter immediately:
  const DataHelpers = createDataHelper(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = createTweetsRoutes(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  server.listen(PORT, () => {
    console.log("Example app listening on port " + server.address().port);
  });
  process.on('SIGINT', cleanup(server, db));
  process.on('SIGTERM', cleanup(server, db));
});