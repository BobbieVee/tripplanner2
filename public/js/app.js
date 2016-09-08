$(function(){
  initializeMap(function(map, marker){
    $.ajax({
      url:'/days',
      method: 'GET'
    })
    .then(function(days){
      new Tripplanner({
        days: days,
        map: map,
        marker: marker,
        data: data
      });
    });
    /*
    var days = [
      {
        hotels: [ data.hotels[0], data.hotels[1] ],
        restaurants: [ data.restaurants[0] ],
        activities: [ data.activities[1] ]
      },
      {
        hotels: [ data.hotels[3]],
        restaurants: [  ],
        activities: [ ]
      }
    ];
    */
  });
  
});
