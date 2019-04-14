const express = require('express');
const router = express.Router();
const Driver = require('../models/drivers');

// get list of drivers from the db
router.get('/drivers', function(req, res, next){
  const { lng, lat, maxDist } = req.query;
   Driver.aggregate([{
     $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          spherical: true,
          distanceField: 'distance',
          maxDistance: parseFloat(maxDist)*1000
        }
    }]).then(function(drivers){
          res.send(drivers)})
       .catch(next);
});

// add a driver into the db
router.post('/drivers', function(req, res, next){
  Driver.create(req.body).then(function(driver){
    res.send(driver);
  }).catch(next);
});

// update a driver in the db
router.put('/drivers/:id', function(req, res, next){
  Driver.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Driver.findOne({_id: req.params.id}).then(function(driver){
      res.send(driver);
    });
  });
});

// delete a driver from the db
router.delete('/drivers/:id', function(req, res, next){
  Driver.findByIdAndDelete({_id: req.params.id}).then(function(driver){
    res.send(driver);
  });
});

module.exports = router;
