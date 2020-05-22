const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
//const uri = "mongodb+srv://root:root@cluster0-u32ne.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = null;
client.connect(err => {
  if(err) return console.error(err)
  console.log('Connected to Database');
  db = client.db('racing');
  
});

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  db.collection('members').find().toArray().then(results => {
    res.json(results);
  })
});

app.get('/api/member/:_id', (req, res) => {
  db.collection('members').find({_id: ObjectId(req.params._id)}).toArray().then(results => {

    if(results.length > 0){
      res.json(results[0]);
    }    
  })

});

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

app.post('/api/member', (req, res) => {
  db.collection('members').find({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobTitle: req.body.jobTitle,
      team: req.body.team
  }).toArray().then(results => {
    if(results.length > 0){
      return res.json({success: false, message: 'Already Exist!'})
    }
    else{
      db.collection('members').insertOne({
        id: randomString(10, '0123456789'),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        team: req.body.team,
        status: req.body.status
      }).then(result => {
        return res.json({success: true})
      })
    }
  })
});

app.put('/api/member', (req, res) => {    
  db.collection('members').find({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    team: req.body.team
  }).toArray().then(results => {
    if(results.length > 0){
      return res.json({success: false, message: 'Already Exist!'})
    }
    else{
      db.collection('members').findOneAndUpdate({
        _id: ObjectId(req.body._id)
      }, {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          jobTitle: req.body.jobTitle,
          team: req.body.team,
          status: req.body.status
        }
      }).then(results => {
        return res.json({success: true})  
      })  
    }
  })
  
});

app.delete('/api/member/:_id', (req, res) => {

  db.collection('members').deleteOne({
    _id: ObjectId(req.params._id)
  }).then(results => {
    db.collection('members').find().toArray().then(results => {
   
      res.json(results);
    })
  })  
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  db.collection('teams').find().toArray().then(results => {
    res.json(results);
  })
});

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
