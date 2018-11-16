'use strict';

const express = require('express');
const multer = require('multer'); 
const bodyParser = require('body-parser'); 
const app = express();
app.use(bodyParser.json());

//where and how to store img's storage
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./Images");
  },
  filename: function (req, file, callback) {
    const fileformat = (file.originalname).split('.');
    callback(null, file.fieldname+'-'+Date.now()+'.'+fileformat[fileformat.length-1]);
  }
});

//create multer object
const upload = multer({ storage: Storage });

//post and get request
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/task_b.html", function (req, res) {
  res.sendFile(__dirname + "/task_b.html");
});
app.get("/task_a.html", function (req, res) {
  res.sendFile(__dirname + "/task_a.html");
});

app.post("/task_b.html",upload.single('img'), function (req, res) {   //.single(fieldname); //for multiple: array(fieldname[, maxCount])
  const url = '/Images/' + req.file.filename;
  res.json({data : url});
  upload(req, res, function (err) {
    if (err) {
      return res.end("Uploaded failed!");
    }
    return res.end("Uploaded successfully!.");
  });
});

app.listen(3000);