var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsMap;
var start;
var end;
var units = 'imperial';

function getDirectionsLocation() {
   $.get('http://ipinfo.io', function(location){
     showDirectionsPosition(location.loc);
     getWeather(location,units);
   },"jsonp");
}
function showDirectionsPosition(position) {
    directionsLatitude = position.split(",")[0];
    directionsLongitude = position.split(",")[1];
    directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
    getDirections();
}

function getDirections() {
  debugger;
    console.log('getDirections');
    directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsOptions = {
        zoom:6,
        center: start
    }
    directionsMap = new google.maps.Map(document.getElementById("map"), directionsOptions);
    directionsDisplay.setMap(directionsMap);
    RouteDetails();
}

function RouteDetails() {
  debugger;
    start = directionsLatLng;
    end = $("#destination").val();
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}
function getWeather(location, units) {
  debugger;
    lat = location.loc.split(",")[0] //.toString();
    lon = location.loc.split(",")[1] //.toString();
    city = location.city;

    //var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units;
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + '&appid=37a77e114c8c172f3675e3503c28aa79';

    console.log(weatherApiUrl);

    $.get(weatherApiUrl, function(weather) {
      var temperature = weather.main.temp;
      var unitLabel;

      //label based in imperial vs metric units
      if (units === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }

      temperature = parseFloat((temperature).toFixed(1));

      console.log(weather);
      $('#icon').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");

      $('#temp').append(temperature + " " + unitLabel);
      $('#city').append(city);
      $('#conditions').append(weather.weather[0].description);
      $('#postal').append(postal);

    }, "jsonp");

  };

$( document ).ready(function() {
    $('.btn').click(function(){
    getDirectionsLocation();
    })
});