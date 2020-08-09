var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');//*
const Data = require('./data');//*

const dbRoute =
  'mongodb+srv://dbUser:dbUserPassword@cluster0-lj5xz.mongodb.net/test?retryWrites=true&w=majority';//*
mongoose.connect(dbRoute, { useNewUrlParser: true });//*
let db = mongoose.connection;//*

db.once('open', () => console.log('connected to the database'));//*
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//*





router.get('/', function (req, res, next) {
  Data.find(function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true, info: data })
    }
  });

});

router.get('/:uid', function (req, res, next) {
  Data.find({ uid: String(req.params.uid)}, (err,data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, info: data });
  });
});


router.post('/', function (req, res, next) {
  let po = new Data();
  po.uid = req.body.uid;
  po.firstName = req.body.firstName;
  po.lastName = req.body.lastName;
  po.grade = req.body.grade;
  po.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.put('/', function (req, res, next) {
  Data.findOneAndUpdate({ uid: req.body.uid }, { $set: { grade: req.body.grade } }, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/', function (req, res, next) {

  Data.findOneAndRemove({ uid: req.body.uid }, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });

});

module.exports = router;
