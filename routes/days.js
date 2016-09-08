var router = require('express').Router();
var Day = require('../models/day');
var Meal = require('../models/meal');
var Restaurant = require('../models/restaurant');
var Place = require('../models/place');
var Hotel = require('../models/hotel');
var Stay = require('../models/stay');
var Activity = require('../models/activity');
var Adventure = require('../models/adventure');
module.exports = router;

router.get('/', function(req, res, next){
  var meals = {
    model: Meal,
    include: [ { 
      model: Restaurant,
      include: [ Place ]
    } ]
  };
  Day.findAll({ include: [ meals ]})
    .then(function(days){
      return days.map(function(day){
        var obj = {};
        obj.id = day.id;
        obj.restaurants = day.meals.map(function(meal){ 
          return meal.restaurant;
        });
        obj.hotels = [];
        obj.activities = [];
        return obj;
      });
    })
    .then(function(days){
      res.send(days);
    })
    .catch(next);
});


router.post('/', function(req,res,next){
  Day.create()
  .then(function(day){
    var obj = {id: day.id};
    obj.restaurants = [];
    obj.activities = [];
    obj.hotels = [];
    console.log('obj being sent back', obj)
    res.send(obj);
  })
  .catch(next);
});

router.delete('/:id', function(req,res,next){
  var dayId = (req.params.id*1) + 1;
  console.log('trying to destroy', dayId);
  Day.destroy({where: {
    id: dayId
  }})
  .then(function(){
     res.send();
  })
  .catch(next);
});

router.post('/:dayid/hotels/:hotelid', function(req,res,next){
  Stay.create ({ dayId: req.params.dayid, hotelId: req.params.hotelid} )
  .then(function(stay){
    var stayId = stay.id;
    return Stay.findById(stayId, {
      include: [{
        model: Hotel,
        include: [ Place ]
        }]
      })
    })
  .then(function(obj){
      console.log('obj=', obj.hotel)

      res.send(obj.hotel);
  })
  .catch(next);
}); 

router.post('/:dayid/restaurants/:restaurantid', function(req,res,next){
  Meal.create({ dayId: req.params.dayid, restaurantId: req.params.restaurantid})
  .then(function(meal){
    var mealId = meal.id;
    return Meal.findById(mealId, {
      include: [{
        model: Restaurant,
        include: [ Place ]
        }]
      })
    })
  .then(function(obj){
    res.send(obj.restaurant);
  })
  .catch(next);
});

router.post('/:dayid/activities/:activityid', function(req,res,next){
  Adventure.create({ dayId: req.params.dayid, activityId: req.params.activityid})
  .then(function(adventure){
    var adventureId = adventure.id;
    return Adventure.findById(adventureId, {
      include: [{
        model: Activity,
        include: [ Place ]
        }]
      })
    })
  .then(function(obj){
    res.send(obj.activity);
  })
  .catch(next);
});

router.delete('/:dayId/hotels/:hotelId', function(req,res, next){
  var dayId = req.params.dayId;
  var hotelId = req.params.hotelId;
  console.log('router.delete day, hotel', dayId, hotelId)
  Stay.destroy({where: {
    dayId: dayId, 
    hotelId: hotelId
  }  })
.then(function(){
  res.send();
})
.catch(next);  
})

router.delete('/:dayId/restaurants/:restaurantId', function(req,res, next){
  var dayId = req.params.dayId;
  var restaurantId = req.params.restaurantId;
  Meal.destroy({where: {
    dayId: dayId, 
    restaurantId: restaurantId
  }  })
.then(function(){
  res.send();
})
.catch(next);  
})

router.delete('/:dayId/activities/:activityId', function(req,res, next){
  var dayId = req.params.dayId;
  var activityId = req.params.activityId;
  Adventure.destroy({where: {
    dayId: dayId, 
    activityId: activityId
  }  })
.then(function(){
  res.send();
})
.catch(next);  
})




