//var button = document.querySelector(".button");
//button.addEventListener("click", function () {
//checking if geolocation exists
//if successful rturn current position
if (navigator.geolocation) {
  //initial request for the location
  navigator.geolocation.getCurrentPosition(getproSuccess, getPosterr);
} else {
  alert("geolocation not available");
}
//getting latitude and longitude
function getproSuccess(pos) {
  //var geoLat = document.querySelector(".latitude");
  //var geoLng = document.querySelector(".longitude");
  geoLat = pos.coords.latitude.toFixed(5);
  geoLng = pos.coords.longitude.toFixed(5);
  geocode(geoLat, geoLng);
  // var geoAcc = pos.coords.accuracy.toFixed(1);
}
//error returned
function getPosterr(err) {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      alert("user denied the request for the current location");
      break;
    case err.POSITION_UNAVAILABLE:
      alert("location iinformation is vailable");
      break;
    case err.TIMEOUT:
      alert("The request to get user location timed out");
      break;
    default:
      alert("An unknown error has occured.");
  }
}
function geocode(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      init(response);
    });
}
function init(res) {
  console.log(res);

  //for icon and picture according to weather description
  switch (res.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("images/clear sky.jpeg")';
      // document.body.style.background-s = 'url("clear sky.jpg")no-repeat';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("images/cloudy day.jpeg")';

      break;
    case "Haze":
      document.body.style.backgroundImage = 'url("images/haze.jpeg")';

      break;
    case "Rain":
      document.body.style.backgroundImage = 'url("images/rain1.jpeg")';

      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("images/snowyday.jpeg")';

      break;
    case "Drizzle":
      document.body.style.backgroundImage = 'url("images/rain2.jpeg")';

      break;
    case "Mist":
      document.body.style.backgroundImage = 'url("images/mist.jpeg")';

      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("images/thunde.jpeg")';

      break;
    default:
      document.body.style.backgroundImage = 'url("images/sunny day.jpeg")';
      break;
  }
  //.then(data=>console.log(data))
  //describig the other varibales
  var name = document.querySelector(".cityname");
  var con = document.querySelector(".Countryname");
  var conid = document.querySelector(".countryid");
  var desc = document.querySelector(".desc");
  var temp = document.querySelector(".temp");
  var lat = document.querySelector(".latitude");
  var long = document.querySelector(".longitude");
  var humi = document.getElementById("humidity");
  var ws = document.getElementById("windSpeed");
  var icon = document.querySelector(".iconImg");

  icon.src =
    "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png";
  var descrip = res.weather[0].description;
  desc.innerText = descrip.charAt(0).toUpperCase() + descrip.slice(1);

  temp.innerHTML = Math.floor(res.main.temp) - 273 + "&#176" + "C";
  ws.innerHTML = "Wind is:: " + Math.floor(res.wind.speed) + "m/s";
  name.innerHTML = res.name;
  con.innerHTML = res.sys.country;
  conid.innerHTML = "Country Id::" + res.sys.id;
  lat.innerHTML = "Latitude is:: " + res.coord.lat;
  long.innerHTML = "Longitude is:: " + res.coord.lon;
  humi.innerHTML = "Humidity levels at:: " + res.main.humidity + "%";
  visi();
}
//for visibility
function visi() {
  var wecon = document.querySelector(".weathercontainer");
  wecon.style.visibility = "visible";
}
//});
