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
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      init(response, lat, lon);
    });
}
function init(result) {
  console.log(result);

  //console.log(result);
  //for icon and picture according to weather description
  switch (result.list[0].weather[0].main) {
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
      document.body.style.backgroundImage = 'url("images/rain3.jpeg")';

      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("images/snowyday.jpeg")';

      break;
    case "Drizzle":
      document.body.style.backgroundImage = 'url("images/rain1.jpeg")';

      break;
    case "Mist":
      document.body.style.backgroundImage = 'url("images/mist.jpeg")';

      break;
    case "Thunderstrom":
      document.body.style.backgroundImage = 'url("images/thunde.jpeg")';

      break;
    default:
      document.body.style.backgroundImage = 'url("images/sunny day.jpeg")';
      break;
  }
  var name = document.querySelector(".cityname");
  var con = document.querySelector(".Countryname");
  var conid = document.querySelector(".countryid");
  var lat = document.querySelector(".latitude");
  var long = document.querySelector(".longitude");

  conid.innerHTML = "Country Id::" + result.city.id;
  name.innerHTML = result.city.name;
  con.innerHTML = result.city.country;
  lat.innerHTML = "Latitude is:: " + result.city.coord.lat;
  long.innerHTML = "Longitude is:: " + result.city.coord.lon;
  visi();
  //collumn wise printing the result
  var columns = document.getElementsByClassName("column");
  var count = 0;
  for (var i = 0; i < columns.length; i++) {
    columns[i].innerHTML = "";
    var ul = document.createElement("ul");
    columns[i].appendChild(ul);

    var date = document.createElement("li");
    var dateText = document.createTextNode(dateBuilder(result.list[count].dt));
    date.appendChild(dateText);
    //Weather desc
    var desc = document.createElement("li");
    var descrip = result.list[count].weather[0].description;
    var descText = document.createTextNode(
      descrip.charAt(0).toUpperCase() + descrip.slice(1)
    );
    desc.appendChild(descText);

    //Temperature
    var temp = document.createElement("li");
    var tempText = document.createTextNode(
      Math.floor(result.list[count].main.temp - 273) + "°C"
    );
    temp.appendChild(tempText);
    //icon
    var icon = document.createElement("img");
    icon.src =
      "http://openweathermap.org/img/wn/" +
      result.list[count].weather[0].icon +
      "@2x.png";
    //humidity
    var humi = document.createElement("li");
    var humiText = document.createTextNode(
      "Humidity levels at:: " + result.list[count].main.humidity + "%"
    );
    humi.appendChild(humiText);
    //wind speed
    var ws = document.createElement("li");
    var wsText = document.createTextNode(
      "Wind is:: " + Math.floor(result.list[count].wind.speed) + "m/s"
    );
    ws.appendChild(wsText);

    //   console.log(dateBuilder(result.list[count].dt));

    ul.appendChild(desc);
    ul.appendChild(temp);
    ul.appendChild(icon);
    ul.appendChild(humi);
    ul.appendChild(ws);
    ul.appendChild(date);
    count = count + 8;
  }
  //building date
  function dateBuilder(dt) {
    var d = new Date(dt * 1000);
    var months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Ocotber",
      "November",
      "December",
    ];
    var days = [
      "Monday",
      "Tuesday",
      "wednesday",
      "Thursday",
      "Friday",
      "Staurday",
      "Sunday",
    ];
    var day = days[d.getDay()];
    var date1 = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    return `${day} ${date1} ${month} ${year}`;
  }
  // for visibility
  function visi() {
    var visi = document.querySelector(".place_info");
    visi.style.visibility = "visible";
  }
}
