var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsMap;
var start;
var end;
var units = 'imperial';

function getDirectionsLocation() {
    console.log("getDirectionsLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showDirectionsPosition);
    } else {
        z.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showDirectionsPosition(position) {
    console.log("showDirectionsPosition");
    directionsLatitude = position.coords.latitude;
    directionsLongitude = position.coords.longitude;
    directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
    getWeather(position,units)
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
    lat = location.coords.latitude //.toString();
    lon = location.coords.longitude //.toString();

    //var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units;
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + '&appid=37a77e114c8c172f3675e3503c28aa79';

    console.log(weatherApiUrl);

    $.get(weatherApiUrl, function(weather) {
      var temperature = weather.main.temp,
        city = weather.name,
        unitLabel;

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
    directionsMap = new google.maps.Map(document.getElementById("map"));
    $('.btn').click(function(){
    getDirectionsLocation();
    })
});