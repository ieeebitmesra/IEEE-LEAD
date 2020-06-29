var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
//calling the api
button.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue.value +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      init(response);
    });
  //.catch((err) => alert("wrong city name!"));
  //passed value and parsig through the data
  function init(result) {
    console.log(result);

    //for icon and picture according to weather description
    switch (result.weather[0].main) {
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
      "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
    var descrip = result.weather[0].description;
    desc.innerText = descrip.charAt(0).toUpperCase() + descrip.slice(1);

    temp.innerHTML = Math.floor(result.main.temp) - 273 + "&#176" + "C";
    ws.innerHTML = "Wind is:: " + Math.floor(result.wind.speed) + "m/s";
    name.innerHTML = result.name;
    con.innerHTML = result.sys.country;
    conid.innerHTML = "Country Id::" + result.sys.id;
    lat.innerHTML = "Latitude is:: " + result.coord.lat;
    long.innerHTML = "Longitude is:: " + result.coord.lon;
    humi.innerHTML = "Humidity levels at:: " + result.main.humidity + "%";
    visi();
  } //for visibility
  function visi() {
    var wecon = document.querySelector(".weathercontainer");
    wecon.style.visibility = "visible";
  }
});
