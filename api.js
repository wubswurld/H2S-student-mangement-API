const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://h2s-student-management.firebaseio.com"
  });