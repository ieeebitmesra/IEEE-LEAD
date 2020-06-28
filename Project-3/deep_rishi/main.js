const api = {
    key: "f50f60580f5345713a7c7c7bb2b0a605",
    base: "https://api.openweathermap.org/data/2.5/"
  }

if (navigator.geolocation) { //check if geolocation is available
    navigator.geolocation.getCurrentPosition(function(position){
      getCurrentresults(position);
    });   
}
function getCurrentresults(place) {    //to fetch the weather using latitude and longitude
  fetch(`${api.base}weather?lat=${place.coords.latitude}&lon=${place.coords.longitude}&units=metric&APPID=${api.key}`)
  .then(function(cresp) {
    return cresp.json();
  })
  .then(function(cdata) {
    displayResults(cdata);
  })
  .catch(function() {});
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {       //pass the input location entered by the user
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
function getResults(query) {        //to fetch the waether using location name
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
         displayResults(data);
    })
    .catch(function() {});
}


function displayResults (weather) {    //to display the weather of desired location
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let cord = document.querySelector('.location .cord');
    cord.innerHTML = `${weather.coord.lat}°N , ${weather.coord.lon}°E`;

    let today = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(today);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${weather.main.temp}<span>°C</span>`;

    let type = document.querySelector('.current .type');
    type.innerText = weather.weather[0].main;

    let vary = document.querySelector('.current .vary');
    vary.innerText = `${weather.main.temp_max}°C / ${weather.main.temp_min}°C`;

    let humi = document.querySelector('.current .humi');
    humi.innerHTML = `<span>Humidity ~ </span>${weather.main.humidity}`;

    
    
    getPrevious(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);

}

  function getPrevious(latp, longp, predate) {    //to fetch weather of previous days
     predate = (predate - 86400);
     fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latp}&lon=${longp}&dt=${predate}&units=metric&appid=${api.key}`)
     .then(function(presp) {
       return presp.json();
     })
     .then(function(predata) {
       
       displayXresults(predata);
     })
     .catch(function() {});
  }

  function displayXresults(xweather) {            //to display weather of previous days
    
    let predate = document.querySelector('.previous .predate');
    predate.innerText = 'Yesterday';

    let prevary = document.querySelector('.previous .prevary');
    prevary.innerHTML = `${xweather.hourly[0].temp}°C / ${xweather.hourly[23].temp}°C`;
    
    let pretype = document.querySelector('.previous .pretype');
    pretype.innerHTML = `${xweather.current.weather[0].main}`;

    
  }

function dateBuilder (d) {     //to get the date of current day
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

