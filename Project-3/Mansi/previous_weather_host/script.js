var button = document.querySelector(".button");
var cityValue = document.querySelector(".inputValue");
//for fetching the city name to get the latitude and longitude
button.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityValue.value +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      geocode(response);
    });
  //for parsing the result
  function geocode(result) {
    console.log(result);
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
      case "Thunderstorm":
        document.body.style.backgroundImage = 'url("images/thunde.jpeg")';

        break;
      default:
        document.body.style.backgroundImage = 'url("images/sunny day.jpeg")';
        break;
    }
    //printing the name and latitude and longitude
    var name = document.querySelector(".cityname");
    var con = document.querySelector(".Countryname");
    var conid = document.querySelector(".countryid");
    var lat = document.querySelector(".latitude");
    var long = document.querySelector(".longitude");
    conid.innerHTML = "Country Id::" + result.sys.id;
    name.innerHTML = result.name;
    con.innerHTML = result.sys.country;
    lat.innerHTML = "Latitude is:: " + result.coord.lat;
    long.innerHTML = "Longitude is:: " + result.coord.lon;
    visi();
    //var p=response.data.results[0].formatted;
    //passing the latiude and longitude
    lat = result.coord.lat;
    long = result.coord.lon;
    date = result.dt;
    //for each day api is called
    init(lat, long, date);
    init2(lat, long);
    init3(lat, long);
    init4(lat, long);
    init5(lat, long);
  }
}); //geocode ends

// var last = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//FIRST API
function init(lat, long, date) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
      lat +
      "&lon=" +
      long +
      "&dt=" +
      date +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      details(response, "4");
    });
  //i++;
} //1 day end

//second API
function init2(lat, long) {
  //for converting date into unix code
  //visi2();
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  var dtt = JSON.stringify(yesterday);
  dtt = dtt.slice(1, 11);
  //dttt = dtt.getTime();
  var dttt = moment(dtt, "YYYY.MM.DD").unix();
  //console.log(dttt);
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
      lat +
      "&lon=" +
      long +
      "&dt=" +
      dttt +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      details(response, "3");
    });
  //i++;
} //day 2 end

//THIRD API
function init3(lat, long) {
  //for converting date into unix code
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 2);
  var dtt = JSON.stringify(yesterday);
  dtt = dtt.slice(1, 11);
  //dttt = dtt.getTime();
  var dttt = moment(dtt, "YYYY.MM.DD").unix();
  //console.log(dttt);
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
      lat +
      "&lon=" +
      long +
      "&dt=" +
      dttt +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      details(response, "2");
    });
  //i++;
} //api3 end

//FOURTH API
function init4(lat, long, date) {
  //for converting date into unix code
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 3);
  var dtt = JSON.stringify(yesterday);
  dtt = dtt.slice(1, 11);
  //dttt = dtt.getTime();
  var dttt = moment(dtt, "YYYY.MM.DD").unix();
  //console.log(dttt);
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
      lat +
      "&lon=" +
      long +
      "&dt=" +
      dttt +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      details(response, "1");
    });
  //i++;
} //api 4 end

//FIFTH API
function init5(lat, long) {
  //for converting date into unix code
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 4);
  var dtt = JSON.stringify(yesterday);
  dtt = dtt.slice(1, 11);
  //dttt = dtt.getTime();
  var dttt = moment(dtt, "YYYY.MM.DD").unix();
  //console.log(dttt);
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
      lat +
      "&lon=" +
      long +
      "&dt=" +
      dttt +
      "&appid=d54e69972be7a9e2e3bfeacef0ab6dc1"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      details(response, "0");
    });
  //i++;
} //api 5 ends

//to print the details of different day in the column
function details(res, i) {
  console.log(res);
  var columns = document.getElementsByClassName("column");
  var count = 0;
  //for (var i = 0; i < columns.length; i++) {
  columns[i].innerHTML = "";
  var ul = document.createElement("ul");
  //ul.style.list-style = none;
  columns[i].appendChild(ul);
  //date
  var date = document.createElement("li");
  var dateText = document.createTextNode(
    dateBuilder(res.current.dt)
    //res.hourly[count].dt
  );
  date.appendChild(dateText);
  //Weather desc

  var desc = document.createElement("li");
  var descrip = res.hourly[count].weather[0].description;
  var descText = document.createTextNode(
    descrip.charAt(0).toUpperCase() + descrip.slice(1)
  );
  desc.appendChild(descText);

  //Temperature
  var temp = document.createElement("li");
  var tempText = document.createTextNode(
    Math.floor(res.hourly[count].temp - 273) + "°C"
  );
  temp.appendChild(tempText);
  //icon
  var icon = document.createElement("img");
  icon.src =
    "http://openweathermap.org/img/wn/" +
    res.hourly[count].weather[0].icon +
    "@2x.png";
  //humidity
  var humi = document.createElement("li");
  var humiText = document.createTextNode(
    "Humidity levels at:: " + res.hourly[count].humidity + "%"
  );
  humi.appendChild(humiText);
  //windspeed
  var ws = document.createElement("li");
  var wsText = document.createTextNode(
    "Wind is:: " + Math.floor(res.hourly[count].wind_speed) + "m/s"
  );
  ws.appendChild(wsText);

  //   console.log(dateBuilder(result.list[count].dt));

  ul.appendChild(desc);
  ul.appendChild(temp);
  ul.appendChild(icon);
  ul.appendChild(humi);
  ul.appendChild(ws);
  ul.appendChild(date);
  count = count + 1;
}

//to build the date
function dateBuilder(dt1) {
  var d = new Date(dt1 * 1000);
  var monthss = [
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
  var dayss = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Staurday",
    "Sunday",
  ];
  var day = dayss[d.getDay()];
  var date1 = d.getDate();
  var month = monthss[d.getMonth()];
  var year = d.getFullYear();
  return `${day} ${date1} ${month} ${year}`;
}

//to show the visibility
function visi() {
  var visi = document.querySelector(".place_info");
  visi.style.visibility = "visible";
}
