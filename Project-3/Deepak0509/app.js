const api = {
    key: "6372c1e835c0577604227118b37da0c2",
}

const searchbox = document.querySelector('.search-input');
searchbox.addEventListener('keypress', setQuery);

let todayDate = new Date();
let todayUnixDate = Math.round(todayDate.getTime() / 1000);
let timeoffsetuser = todayDate.getTimezoneOffset();
let pastday1UnixDate = todayUnixDate - 86400;
let pastday2UnixDate = todayUnixDate - 86400 * 2;
let pastday3UnixDate = todayUnixDate - 86400 * 3;
let pastday4UnixDate = todayUnixDate - 86400 * 4;
let pastday5UnixDate = todayUnixDate - 86400 * 5;

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`)
        .then(data => {
            return data.json();
        }).then(getCoordinates);
}

function getCoordinates(data) {
    let latitude = data.coord.lat;
    let longitude = data.coord.lon;
    console.log(latitude);
    console.log(longitude);
    getresults(latitude, longitude);
}

function getresults(latitude, longitude) {
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayWeather);
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${pastday1UnixDate}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayPastWeatherDay1);
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${pastday2UnixDate}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayPastWeatherDay2);
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${pastday3UnixDate}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayPastWeatherDay3);
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${pastday4UnixDate}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayPastWeatherDay4);
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${pastday5UnixDate}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayPastWeatherDay5);
}

function displayWeather(weather) {

    let timeoffsetcity = weather.timezone_offset;
    let difference = (timeoffsetcity + (timeoffsetuser * 60)) * 1000;

    let latlong = document.querySelector('.latlong');
    latitudeofplace = weather.lat;
    longitudeofplace = weather.lon;
    latlong.innerText = `Latitude : ${latitudeofplace}, Longitude: ${longitudeofplace}`;

    let nowDate = new Date(new Date().getTime() + difference);
    let currentDate = document.querySelector('.currentDate');
    currentDate.innerText = dateBuilder(nowDate);

    let currentIcon = document.querySelector('.currentIcon');
    currentIconID = weather.current.weather[0].icon;
    currentIcon.innerHTML = `<img src="icons/${currentIconID}.png"/>`;

    let currentTemp = document.querySelector('.currentTemp');
    currentTemp.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let currrentWeather = document.querySelector('.currentWeather');
    currrentWeather.innerText = weather.current.weather[0].description;


    let now_1 = new Date(new Date(new Date().getTime() + 86400000 + difference));
    let date_1 = document.querySelector('.date_1');
    date_1.innerText = dateBuilder(now_1);

    let icon_1 = document.querySelector('.icon_1');
    iconID = weather.daily[0].weather[0].icon;
    icon_1.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_1 = document.querySelector('.temp_1');
    temp_1.innerHTML = `${Math.round((weather.daily[0].temp.morn+weather.daily[0].temp.day+weather.daily[0].temp.eve+weather.daily[0].temp.night)/4)-273}<span>°c</span>`;

    let weather_1 = document.querySelector('.weather_1');
    weather_1.innerText = weather.daily[0].weather[0].description;

    let highlow_1 = document.querySelector('.high-low_1');
    highlow_1.innerText = `${Math.round(weather.daily[0].temp.max)-273}°c / ${Math.round(weather.daily[0].temp.min)-273}°c`;


    let now_2 = new Date(new Date(new Date().getTime() + 86400000 * 2 + difference));
    let date_2 = document.querySelector('.date_2');
    date_2.innerText = dateBuilder(now_2);

    let icon_2 = document.querySelector('.icon_2');
    iconID = weather.daily[1].weather[0].icon;
    icon_2.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_2 = document.querySelector('.temp_2');
    temp_2.innerHTML = `${Math.round((weather.daily[1].temp.morn+weather.daily[1].temp.day+weather.daily[1].temp.eve+weather.daily[1].temp.night)/4)-273}<span>°c</span>`;

    let weather_2 = document.querySelector('.weather_2');
    weather_2.innerText = weather.daily[1].weather[0].description;

    let highlow_2 = document.querySelector('.high-low_2');
    highlow_2.innerText = `${Math.round(weather.daily[1].temp.max)-273}°c / ${Math.round(weather.daily[1].temp.min)-273}°c`;


    let now_3 = new Date(new Date(new Date().getTime() + 86400000 * 3 + difference));
    let date_3 = document.querySelector('.date_3');
    date_3.innerText = dateBuilder(now_3);

    let icon_3 = document.querySelector('.icon_3');
    iconID = weather.daily[2].weather[0].icon;
    icon_3.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_3 = document.querySelector('.temp_3');
    temp_3.innerHTML = `${Math.round((weather.daily[2].temp.morn+weather.daily[2].temp.day+weather.daily[2].temp.eve+weather.daily[2].temp.night)/4)-273}<span>°c</span>`;

    let weather_3 = document.querySelector('.weather_3');
    weather_3.innerText = weather.daily[2].weather[0].description;

    let highlow_3 = document.querySelector('.high-low_3');
    highlow_3.innerText = `${Math.round(weather.daily[2].temp.max)-273}°c / ${Math.round(weather.daily[2].temp.min)-273}°c`;


    let now_4 = new Date(new Date(new Date().getTime() + 86400000 * 4 + difference));
    let date_4 = document.querySelector('.date_4');
    date_4.innerText = dateBuilder(now_4);

    let icon_4 = document.querySelector('.icon_4');
    iconID = weather.daily[3].weather[0].icon;
    icon_4.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_4 = document.querySelector('.temp_4');
    temp_4.innerHTML = `${Math.round((weather.daily[3].temp.morn+weather.daily[3].temp.day+weather.daily[3].temp.eve+weather.daily[3].temp.night)/4)-273}<span>°c</span>`;

    let weather_4 = document.querySelector('.weather_4');
    weather_4.innerText = weather.daily[3].weather[0].description;

    let highlow_4 = document.querySelector('.high-low_4');
    highlow_4.innerText = `${Math.round(weather.daily[3].temp.max)-273}°c / ${Math.round(weather.daily[3].temp.min)-273}°c`;



    let now_5 = new Date(new Date(new Date().getTime() + 86400000 * 5 + difference));
    let date_5 = document.querySelector('.date_5');
    date_5.innerText = dateBuilder(now_5);

    let icon_5 = document.querySelector('.icon_5');
    iconID = weather.daily[4].weather[0].icon;
    icon_5.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_5 = document.querySelector('.temp_5');
    temp_5.innerHTML = `${Math.round((weather.daily[4].temp.morn+weather.daily[4].temp.day+weather.daily[4].temp.eve+weather.daily[4].temp.night)/4)-273}<span>°c</span>`;

    let weather_5 = document.querySelector('.weather_5');
    weather_5.innerText = weather.daily[4].weather[0].description;

    let highlow_5 = document.querySelector('.high-low_5');
    highlow_5.innerText = `${Math.round(weather.daily[4].temp.max)-273}°c / ${Math.round(weather.daily[4].temp.min)-273}°c`;


    let now_6 = new Date(new Date(new Date().getTime() + 86400000 * 6 + difference));
    let date_6 = document.querySelector('.date_6');
    date_6.innerText = dateBuilder(now_6);

    let icon_6 = document.querySelector('.icon_6');
    iconID = weather.daily[5].weather[0].icon;
    icon_6.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_6 = document.querySelector('.temp_6');
    temp_6.innerHTML = `${Math.round((weather.daily[5].temp.morn+weather.daily[5].temp.day+weather.daily[5].temp.eve+weather.daily[5].temp.night)/4)-273}<span>°c</span>`;

    let weather_6 = document.querySelector('.weather_6');
    weather_6.innerText = weather.daily[5].weather[0].description;

    let highlow_6 = document.querySelector('.high-low_6');
    highlow_6.innerText = `${Math.round(weather.daily[5].temp.max)-273}°c / ${Math.round(weather.daily[5].temp.min)-273}°c`;


    let now_7 = new Date(new Date(new Date().getTime() + 86400000 * 7 + difference));
    let date_7 = document.querySelector('.date_7');
    date_7.innerText = dateBuilder(now_7);

    let icon_7 = document.querySelector('.icon_7');
    iconID = weather.daily[6].weather[0].icon;
    icon_7.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_7 = document.querySelector('.temp_7');
    temp_7.innerHTML = `${Math.round((weather.daily[6].temp.morn+weather.daily[6].temp.day+weather.daily[6].temp.eve+weather.daily[6].temp.night)/4)-273}<span>°c</span>`;

    let weather_7 = document.querySelector('.weather_7');
    weather_7.innerText = weather.daily[6].weather[0].description;

    let highlow_7 = document.querySelector('.high-low_7');
    highlow_7.innerText = `${Math.round(weather.daily[6].temp.max)-273}°c / ${Math.round(weather.daily[6].temp.min)-273}°c`;
}

function displayPastWeatherDay1(weather) {
    let nowPast_1 = new Date(new Date(new Date().getTime() - 86400000));
    let datePast_1 = document.querySelector('.datePast_1');
    datePast_1.innerText = dateBuilder(nowPast_1);

    let iconPast_1 = document.querySelector('.iconPast_1');
    iconID = weather.current.weather[0].icon;
    iconPast_1.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPast_1 = document.querySelector('.tempPast_1');
    tempPast_1.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPast_1 = document.querySelector('.weatherPast_1');
    weatherPast_1.innerText = weather.current.weather[0].description;

    let humidityPast_1 = document.querySelector('.humidityPast_1');
    humidityPast_1.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay2(weather) {
    let nowPast_2 = new Date(new Date(new Date().getTime() - 86400000 * 2));
    let datePast_2 = document.querySelector('.datePast_2');
    datePast_2.innerText = dateBuilder(nowPast_2);

    let iconPast_2 = document.querySelector('.iconPast_2');
    iconID = weather.current.weather[0].icon;
    iconPast_2.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPast_2 = document.querySelector('.tempPast_2');
    tempPast_2.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPast_2 = document.querySelector('.weatherPast_2');
    weatherPast_2.innerText = weather.current.weather[0].description;

    let humidityPast_2 = document.querySelector('.humidityPast_2');
    humidityPast_2.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay3(weather) {
    let nowPast_3 = new Date(new Date(new Date().getTime() - 86400000 * 3));
    let datePast_3 = document.querySelector('.datePast_3');
    datePast_3.innerText = dateBuilder(nowPast_3);

    let iconPast_3 = document.querySelector('.iconPast_3');
    iconID = weather.current.weather[0].icon;
    iconPast_3.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPast_3 = document.querySelector('.tempPast_3');
    tempPast_3.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPast_3 = document.querySelector('.weatherPast_3');
    weatherPast_3.innerText = weather.current.weather[0].description;

    let humidityPast_3 = document.querySelector('.humidityPast_3');
    humidityPast_3.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay4(weather) {
    let nowPast_4 = new Date(new Date(new Date().getTime() - 86400000 * 4));
    let datePast_4 = document.querySelector('.datePast_4');
    datePast_4.innerText = dateBuilder(nowPast_4);

    let iconPast_4 = document.querySelector('.iconPast_4');
    iconID = weather.current.weather[0].icon;
    iconPast_4.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPast_4 = document.querySelector('.tempPast_4');
    tempPast_4.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPast_4 = document.querySelector('.weatherPast_4');
    weatherPast_4.innerText = weather.current.weather[0].description;

    let humidityPast_4 = document.querySelector('.humidityPast_4');
    humidityPast_4.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay5(weather) {
    let nowPast_5 = new Date(new Date(new Date().getTime() - 86400000 * 5));
    let datePast_5 = document.querySelector('.datePast_5');
    datePast_5.innerText = dateBuilder(nowPast_5);

    let iconPast_5 = document.querySelector('.iconPast_5');
    iconID = weather.current.weather[0].icon;
    iconPast_5.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPast_5 = document.querySelector('.tempPast_5');
    tempPast_5.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPast_5 = document.querySelector('.weatherPast_5');
    weatherPast_5.innerText = weather.current.weather[0].description;

    let humidityPast_5 = document.querySelector('.humidityPast_5');
    humidityPast_5.innerText = `${weather.current.humidity}%`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

function locationWeather() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
    }

    function setPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeather(lat, lon);
    }

    function showError(error) {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p> ${error.message} </p>`;
    }

    function getWeather(lat, lon) {
        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayWeatherLocation);
        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${pastday1UnixDate}&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayPastWeatherDay1Location);
        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${pastday2UnixDate}&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayPastWeatherDay2Location);
        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${pastday3UnixDate}&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayPastWeatherDay3Location);
        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${pastday4UnixDate}&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayPastWeatherDay4Location);
        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${pastday5UnixDate}&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayPastWeatherDay5Location);
    }
}

function displayWeatherLocation(weather) {

    let latlongLocation = document.querySelector('.latlongLocation');
    let latitudeoflocation = weather.lat;
    let longitudeoflocation = weather.lon;
    latlongLocation.innerText = `Latitude : ${latitudeoflocation}, Longitude: ${longitudeoflocation}`;

    let nowDateLocation = new Date;
    let currentDateLocation = document.querySelector('.currentDateLocation');
    currentDateLocation.innerText = dateBuilder(nowDateLocation);

    let currentIconLocation = document.querySelector('.currentIconLocation');
    currentIconID = weather.current.weather[0].icon;
    currentIconLocation.innerHTML = `<img src="icons/${currentIconID}.png"/>`;

    let currentTempLocation = document.querySelector('.currentTempLocation');
    currentTempLocation.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let currrentWeatherLocation = document.querySelector('.currentWeatherLocation');
    currrentWeatherLocation.innerText = weather.current.weather[0].description;


    let now_1 = new Date(new Date(new Date().getTime() + 86400000));
    let dateLocation_1 = document.querySelector('.dateLocation_1');
    dateLocation_1.innerText = dateBuilder(now_1);

    let iconLocation_1 = document.querySelector('.iconLocation_1');
    iconID = weather.daily[0].weather[0].icon;
    iconLocation_1.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempLocation_1 = document.querySelector('.tempLocation_1');
    tempLocation_1.innerHTML = `${Math.round((weather.daily[0].temp.morn+weather.daily[0].temp.day+weather.daily[0].temp.eve+weather.daily[0].temp.night)/4)-273}<span>°c</span>`;

    let weatherLocation_1 = document.querySelector('.weatherLocation_1');
    weatherLocation_1.innerText = weather.daily[0].weather[0].description;

    let highlowLocation_1 = document.querySelector('.high-lowLocation_1');
    highlowLocation_1.innerText = `${Math.round(weather.daily[0].temp.max)-273}°c / ${Math.round(weather.daily[0].temp.min)-273}°c`;


    let now_2 = new Date(new Date(new Date().getTime() + 86400000 * 2));
    let dateLocation_2 = document.querySelector('.dateLocation_2');
    dateLocation_2.innerText = dateBuilder(now_2);

    let iconLocation_2 = document.querySelector('.iconLocation_2');
    iconID = weather.daily[1].weather[0].icon;
    iconLocation_2.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempLocation_2 = document.querySelector('.tempLocation_2');
    tempLocation_2.innerHTML = `${Math.round((weather.daily[1].temp.morn+weather.daily[1].temp.day+weather.daily[1].temp.eve+weather.daily[1].temp.night)/4)-273}<span>°c</span>`;

    let weatherLocation_2 = document.querySelector('.weatherLocation_2');
    weatherLocation_2.innerText = weather.daily[1].weather[0].description;

    let highlowLocation_2 = document.querySelector('.high-lowLocation_2');
    highlowLocation_2.innerText = `${Math.round(weather.daily[1].temp.max)-273}°c / ${Math.round(weather.daily[1].temp.min)-273}°c`;


    let now_3 = new Date(new Date(new Date().getTime() + 86400000 * 3));
    let dateLocation_3 = document.querySelector('.dateLocation_3');
    dateLocation_3.innerText = dateBuilder(now_3);

    let iconLocation_3 = document.querySelector('.iconLocation_3');
    iconID = weather.daily[2].weather[0].icon;
    iconLocation_3.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempLocation_3 = document.querySelector('.tempLocation_3');
    tempLocation_3.innerHTML = `${Math.round((weather.daily[2].temp.morn+weather.daily[2].temp.day+weather.daily[2].temp.eve+weather.daily[2].temp.night)/4)-273}<span>°c</span>`;

    let weatherLocation_3 = document.querySelector('.weatherLocation_3');
    weatherLocation_3.innerText = weather.daily[2].weather[0].description;

    let highlowLocation_3 = document.querySelector('.high-lowLocation_3');
    highlowLocation_3.innerText = `${Math.round(weather.daily[2].temp.max)-273}°c / ${Math.round(weather.daily[2].temp.min)-273}°c`;


    let now_4 = new Date(new Date(new Date().getTime() + 86400000 * 4));
    let dateLocation_4 = document.querySelector('.dateLocation_4');
    dateLocation_4.innerText = dateBuilder(now_4);

    let iconLocation_4 = document.querySelector('.iconLocation_4');
    iconID = weather.daily[3].weather[0].icon;
    iconLocation_4.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempLocation_4 = document.querySelector('.tempLocation_4');
    tempLocation_4.innerHTML = `${Math.round((weather.daily[3].temp.morn+weather.daily[3].temp.day+weather.daily[3].temp.eve+weather.daily[3].temp.night)/4)-273}<span>°c</span>`;

    let weatherLocation_4 = document.querySelector('.weatherLocation_4');
    weatherLocation_4.innerText = weather.daily[3].weather[0].description;

    let highlowLocation_4 = document.querySelector('.high-lowLocation_4');
    highlowLocation_4.innerText = `${Math.round(weather.daily[3].temp.max)-273}°c / ${Math.round(weather.daily[3].temp.min)-273}°c`;



    let now_5 = new Date(new Date(new Date().getTime() + 86400000 * 5));
    let dateLocation_5 = document.querySelector('.dateLocation_5');
    dateLocation_5.innerText = dateBuilder(now_5);

    let iconLocation_5 = document.querySelector('.iconLocation_5');
    iconID = weather.daily[4].weather[0].icon;
    iconLocation_5.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempLocation_5 = document.querySelector('.tempLocation_5');
    tempLocation_5.innerHTML = `${Math.round((weather.daily[4].temp.morn+weather.daily[4].temp.day+weather.daily[4].temp.eve+weather.daily[4].temp.night)/4)-273}<span>°c</span>`;

    let weatherLocation_5 = document.querySelector('.weatherLocation_5');
    weatherLocation_5.innerText = weather.daily[4].weather[0].description;

    let highlowLocation_5 = document.querySelector('.high-lowLocation_5');
    highlowLocation_5.innerText = `${Math.round(weather.daily[4].temp.max)-273}°c / ${Math.round(weather.daily[4].temp.min)-273}°c`;


    let now_6 = new Date(new Date(new Date().getTime() + 86400000 * 6));
    let dateLocation_6 = document.querySelector('.dateLocation_6');
    dateLocation_6.innerText = dateBuilder(now_6);

    let iconLocation_6 = document.querySelector('.iconLocation_6');
    iconID = weather.daily[5].weather[0].icon;
    iconLocation_6.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempLocation_6 = document.querySelector('.tempLocation_6');
    tempLocation_6.innerHTML = `${Math.round((weather.daily[5].temp.morn+weather.daily[5].temp.day+weather.daily[5].temp.eve+weather.daily[5].temp.night)/4)-273}<span>°c</span>`;

    let weatherLocation_6 = document.querySelector('.weatherLocation_6');
    weatherLocation_6.innerText = weather.daily[5].weather[0].description;

    let highlowLocation_6 = document.querySelector('.high-lowLocation_6');
    highlowLocation_6.innerText = `${Math.round(weather.daily[5].temp.max)-273}°c / ${Math.round(weather.daily[5].temp.min)-273}°c`;


    let now_7 = new Date(new Date(new Date().getTime() + 86400000 * 7));
    let dateLocation_7 = document.querySelector('.dateLocation_7');
    dateLocation_7.innerText = dateBuilder(now_7);

    let iconLocation_7 = document.querySelector('.iconLocation_7');
    iconID = weather.daily[6].weather[0].icon;
    iconLocation_7.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempLocation_7 = document.querySelector('.tempLocation_7');
    tempLocation_7.innerHTML = `${Math.round((weather.daily[6].temp.morn+weather.daily[6].temp.day+weather.daily[6].temp.eve+weather.daily[6].temp.night)/4)-273}<span>°c</span>`;

    let weatherLocation_7 = document.querySelector('.weatherLocation_7');
    weatherLocation_7.innerText = weather.daily[6].weather[0].description;

    let highlowLocation_7 = document.querySelector('.high-lowLocation_7');
    highlowLocation_7.innerText = `${Math.round(weather.daily[6].temp.max)-273}°c / ${Math.round(weather.daily[6].temp.min)-273}°c`;
}


function displayPastWeatherDay1Location(weather) {

    let nowPast_1 = new Date(new Date(new Date().getTime() - 86400000));
    let datePastLocation_1 = document.querySelector('.datePastLocation_1');
    datePastLocation_1.innerText = dateBuilder(nowPast_1);

    let iconPastLocation_1 = document.querySelector('.iconPastLocation_1');
    iconID = weather.current.weather[0].icon;
    iconPastLocation_1.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPastLocation_1 = document.querySelector('.tempPastLocation_1');
    tempPastLocation_1.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPastLocation_1 = document.querySelector('.weatherPastLocation_1');
    weatherPastLocation_1.innerText = weather.current.weather[0].description;

    let humidityPastLocation_1 = document.querySelector('.humidityPastLocation_1');
    humidityPastLocation_1.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay2Location(weather) {

    let nowPast_2 = new Date(new Date(new Date().getTime() - 86400000 * 2));
    let datePastLocation_2 = document.querySelector('.datePastLocation_2');
    datePastLocation_2.innerText = dateBuilder(nowPast_2);

    let iconPastLocation_2 = document.querySelector('.iconPastLocation_2');
    iconID = weather.current.weather[0].icon;
    iconPastLocation_2.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPastLocation_2 = document.querySelector('.tempPastLocation_2');
    tempPastLocation_2.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPastLocation_2 = document.querySelector('.weatherPastLocation_2');
    weatherPastLocation_2.innerText = weather.current.weather[0].description;

    let humidityPastLocation_2 = document.querySelector('.humidityPastLocation_2');
    humidityPastLocation_2.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay3Location(weather) {

    let nowPast_3 = new Date(new Date(new Date().getTime() - 86400000 * 3));
    let datePastLocation_3 = document.querySelector('.datePastLocation_3');
    datePastLocation_3.innerText = dateBuilder(nowPast_3);

    let iconPastLocation_3 = document.querySelector('.iconPastLocation_3');
    iconID = weather.current.weather[0].icon;
    iconPastLocation_3.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPastLocation_3 = document.querySelector('.tempPastLocation_3');
    tempPastLocation_3.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPastLocation_3 = document.querySelector('.weatherPastLocation_3');
    weatherPastLocation_3.innerText = weather.current.weather[0].description;

    let humidityPastLocation_3 = document.querySelector('.humidityPastLocation_3');
    humidityPastLocation_3.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay4Location(weather) {

    let nowPast_4 = new Date(new Date(new Date().getTime() - 86400000 * 4));
    let datePastLocation_4 = document.querySelector('.datePastLocation_4');
    datePastLocation_4.innerText = dateBuilder(nowPast_4);

    let iconPastLocation_4 = document.querySelector('.iconPastLocation_4');
    iconID = weather.current.weather[0].icon;
    iconPastLocation_4.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPastLocation_4 = document.querySelector('.tempPastLocation_4');
    tempPastLocation_4.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPastLocation_4 = document.querySelector('.weatherPastLocation_4');
    weatherPastLocation_4.innerText = weather.current.weather[0].description;

    let humidityPastLocation_4 = document.querySelector('.humidityPastLocation_4');
    humidityPastLocation_4.innerText = `${weather.current.humidity}%`;
}

function displayPastWeatherDay5Location(weather) {

    let nowPast_5 = new Date(new Date(new Date().getTime() - 86400000 * 5));
    let datePastLocation_5 = document.querySelector('.datePastLocation_5');
    datePastLocation_5.innerText = dateBuilder(nowPast_5);

    let iconPastLocation_5 = document.querySelector('.iconPastLocation_5');
    iconID = weather.current.weather[0].icon;
    iconPastLocation_5.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let tempPastLocation_5 = document.querySelector('.tempPastLocation_5');
    tempPastLocation_5.innerHTML = `${Math.round(weather.current.temp)-273}<span>°c</span>`;

    let weatherPastLocation_5 = document.querySelector('.weatherPastLocation_5');
    weatherPastLocation_5.innerText = weather.current.weather[0].description;

    let humidityPastLocation_5 = document.querySelector('.humidityPastLocation_5');
    humidityPastLocation_5.innerText = `${weather.current.humidity}%`;
}
