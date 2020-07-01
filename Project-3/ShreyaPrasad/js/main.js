google.maps.event.addDomListener(window, 'load', start)
var place;
var lati;
var longi;
var place_s;
var i = 23;
var j = 24;
var dat;
const iconElement = document.querySelector(".weat-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".locati p");
const dateElement = document.querySelector(".date");
const api = "http://api.openweathermap.org/data/2.5/weather?lat=";
const applicationpi = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const history = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=";

const weath = {};

weath.temperature = {
    unit: "celsius"
}
var mausam = {};

mausam.temperature = {
    unit: "celsius"
}
var forecast = {};

forecast.temperature = {
    unit: "celsius"
}

if (!navigator.geolocation) {
    console.log('Geolocation is not available');

} else {

    console.log('Geolocation is available');
    navigator.geolocation.watchPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
        var currentloc = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyAikOGBw3sNCCKTQK_MP11RtLx6uTQVur8";
        console.log(currentloc);
        fetch(currentloc)
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            })
            .then(function(data) {
                console.log(data.results[0].address_components[3].long_name);
                getWeather(latitude, longitude);
            });
    });
}


function getWeather(latitude, longitude) {
    let weathapi = api + latitude + "&lon=" + longitude + "&appid=be5331faa75e14d6b22962005d27f936";
    console.log(weathapi);

    fetch(weathapi)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weath.datetime = new Date();
            dt = data.dt;
            console.log(dt);
            weath.temperature.value = Math.round(data.main.temp) - 273;
            weath.description = data.weather[0].description;
            weath.iconId = data.weather[0].icon;
            //weath.timezone = data.sys.timezone;
            weath.city = data.name;
            weath.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        });

    function displayWeather() {
        iconElement.innerHTML = `<img src="icons/${weath.iconId}.png"/>`;
        dateElement.innerHTML = weath.datetime;
        tempElement.innerHTML = `${weath.temperature.value}` + '&deg;' + "C";
        descElement.innerHTML = weath.description;
        locationElement.innerHTML = `${weath.city},${weath.country}`;

    }
}

const weather = {};

weather.temperature = {
    unit: "celsius"
}

function start() {
    var ip = document.getElementById('loc');
    var autoCom = new google.maps.places.Autocomplete(ip);
    google.maps.event.addListener(autoCom, 'place_changed', function() {
        place_s = autoCom.getPlace();

    });
};

function getResult() {
    lati = place_s.geometry.location.lat();
    longi = place_s.geometry.location.lng();
    console.log(lati);
    console.log(longi);
    const locapi = api + lati + "&lon=" + longi + "&appid=be5331faa75e14d6b22962005d27f936";
    console.log(locapi);

    fetch(locapi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .then(function(data) {
            weather.datetime = new Date();
            weather.temperature.value = Math.round(data.main.temp) - 273;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;;
            weather.city = data.name;
            weather.country = data.sys.country;
            dat = data.dt;
        })
        .then(function() {
            weatherForecast();
        });

    function weatherForecast() {
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        dateElement.innerHTML = weather.datetime;
        tempElement.innerHTML = `${weather.temperature.value}<span>°C</span>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city},${weather.country}`;

    }
}

function next() {
    const localapi = applicationpi + lati + "&lon=" + longi + "&appid=be5331faa75e14d6b22962005d27f936";
    console.log(localapi);

    fetch(localapi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .then(function(data) {
            while (i < 48) {
                mausam.temperature.value = Math.round(data.hourly[i].temp) - 273;
                mausam.description = data.hourly[i].weather[0].description;
                mausam.iconId = data.hourly[i].weather[0].icon;
                nextForecast();
                i = (i * 2) + 1;
            }
        });

    function nextForecast() {
        iconElement.innerHTML = `<img src="icons/${mausam.iconId}.png"/>`;
        tempElement.innerHTML = `${mausam.temperature.value}<span>°C</span>`;
        descElement.innerHTML = mausam.description;
        if (i == 47)
            i = 23;
    }
}

function previous() {
    dat = (dat - 86400);
    const localapi = history + lati + "&lon=" + longi + "&dt=" + dat + "&appid=be5331faa75e14d6b22962005d27f936";
    console.log(localapi);

    fetch(localapi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            //console.log(data);
            return data;
        })
        .then(function(data) {
            forecast.temperature.value = Math.round(data.current.temp) - 273;
            forecast.description = data.current.weather[0].description;
            forecast.iconId = data.current.weather[0].icon;
            previousForecast();
        })


}

function previousForecast() {
    iconElement.innerHTML = `<img src="icons/${forecast.iconId}.png"/>`;
    tempElement.innerHTML = `${forecast.temperature.value}<span>°C</span>`;
    descElement.innerHTML = forecast.description;

}