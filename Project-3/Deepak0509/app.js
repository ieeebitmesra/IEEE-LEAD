const api = {
    key: "6372c1e835c0577604227118b37da0c2",
}


const searchbox = document.querySelector('.search-input');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
    fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayCurrentWeather);
}

function displayCurrentWeather(weather) {

    let nowDate = new Date();
    let currentDate = document.querySelector('.currentDate');
    currentDate.innerText = dateBuilder(nowDate);

    let currentIcon = document.querySelector('.currentIcon');
    currentIconID = weather.weather[0].icon;
    currentIcon.innerHTML = `<img src="icons/${currentIconID}.png"/>`;

    let currentTemp = document.querySelector('.currentTemp');
    currentTemp.innerHTML = `${Math.round(weather.main.temp)-273}<span>°c</span>`;

    let currrentWeather = document.querySelector('.currentWeather');
    currrentWeather.innerText = weather.weather[0].description;

    let currentHighLow = document.querySelector('.currentHigh-Low');
    currentHighLow.innerText = `${Math.round(weather.main.temp_max)-273}°c / ${Math.round(weather.main.temp_min)-273}°c`;

}

function displayResults(weather) {

    let now_1 = new Date(new Date(new Date().getTime() + 86400000));
    let date_1 = document.querySelector('.date_1');
    date_1.innerText = dateBuilder(now_1);

    let icon_1 = document.querySelector('.icon_1');
    iconID = weather.list[8].weather[0].icon;
    icon_1.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_1 = document.querySelector('.temp_1');
    temp_1.innerHTML = `${Math.round(weather.list[8].main.temp)-273}<span>°c</span>`;

    let weather_1 = document.querySelector('.weather_1');
    weather_1.innerText = weather.list[8].weather[0].description;

    let highlow_1 = document.querySelector('.high-low_1');
    highlow_1.innerText = `${Math.round(weather.list[8].main.temp_max)-273}°c / ${Math.round(weather.list[8].main.temp_min)-273}°c`;


    let now_2 = new Date(new Date(new Date().getTime() + 86400000 * 2));
    let date_2 = document.querySelector('.date_2');
    date_2.innerText = dateBuilder(now_2);

    let icon_2 = document.querySelector('.icon_2');
    iconID = weather.list[16].weather[0].icon;
    icon_2.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_2 = document.querySelector('.temp_2');
    temp_2.innerHTML = `${Math.round(weather.list[16].main.temp)-273}<span>°c</span>`;

    let weather_2 = document.querySelector('.weather_2');
    weather_2.innerText = weather.list[16].weather[0].description;

    let highlow_2 = document.querySelector('.high-low_2');
    highlow_2.innerText = `${Math.round(weather.list[16].main.temp_max)-273}°c / ${Math.round(weather.list[16].main.temp_min)-273}°c`;



    let now_3 = new Date(new Date(new Date().getTime() + 86400000 * 3));
    let date_3 = document.querySelector('.date_3');
    date_3.innerText = dateBuilder(now_3);

    let icon_3 = document.querySelector('.icon_3');
    iconID = weather.list[24].weather[0].icon;
    icon_3.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_3 = document.querySelector('.temp_3');
    temp_3.innerHTML = `${Math.round(weather.list[24].main.temp)-273}<span>°c</span>`;

    let weather_3 = document.querySelector('.weather_3');
    weather_3.innerText = weather.list[24].weather[0].description;

    let highlow_3 = document.querySelector('.high-low_3');
    highlow_3.innerText = `${Math.round(weather.list[24].main.temp_max)-273}°c / ${Math.round(weather.list[24].main.temp_min)-273}°c`;
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
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    }

    function showError(error) {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p> ${error.message} </p>`;
    }

    function getWeather(latitude, longitude) {

        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayResultsLocation);
        fetch(`https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayCurrentWeatherLocation);
    }
}

function displayCurrentWeatherLocation(weather) {
    let nowDateLocation = new Date();
    let currentDateLocation = document.querySelector('.currentDateLocation');
    currentDateLocation.innerText = dateBuilder(nowDateLocation);

    let currentIconLocation = document.querySelector('.currentIconLocation');
    currentIconID = weather.weather[0].icon;
    currentIconLocation.innerHTML = `<img src="icons/${currentIconID}.png"/>`;

    let currentTempLocation = document.querySelector('.currentTempLocation');
    currentTempLocation.innerHTML = `${Math.round(weather.main.temp)-273}<span>°c</span>`;

    let currrentWeatherLocation = document.querySelector('.currentWeatherLocation');
    currrentWeatherLocation.innerText = weather.weather[0].description;

    let currentHighLowLocation = document.querySelector('.currentHigh-LowLocation');
    currentHighLowLocation.innerText = `${Math.round(weather.main.temp_max)-273}°c / ${Math.round(weather.main.temp_min)-273}°c`;
}

function displayResultsLocation(weather) {
    let now_1 = new Date(new Date(new Date().getTime() + 86400000));
    let date_1 = document.querySelector('.dateLocation_1');
    date_1.innerText = dateBuilder(now_1);

    let icon_1 = document.querySelector('.iconLocation_1');
    iconID = weather.list[8].weather[0].icon;
    icon_1.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_1 = document.querySelector('.tempLocation_1');
    temp_1.innerHTML = `${Math.round(weather.list[8].main.temp)-273}<span>°c</span>`;

    let weather_1 = document.querySelector('.weatherLocation_1');
    weather_1.innerText = weather.list[8].weather[0].main;

    let highlow_1 = document.querySelector('.high-lowLocation_1');
    highlow_1.innerText = `${Math.round(weather.list[8].main.temp_max-273)}°c / ${Math.round(weather.list[8].main.temp_min-273)}°c`;



    let now_2 = new Date(new Date(new Date().getTime() + 86400000 * 2));
    let date_2 = document.querySelector('.dateLocation_2');
    date_2.innerText = dateBuilder(now_2);

    let icon_2 = document.querySelector('.iconLocation_2');
    iconID = weather.list[16].weather[0].icon;
    icon_2.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_2 = document.querySelector('.tempLocation_2');
    temp_2.innerHTML = `${Math.round(weather.list[16].main.temp)-273}<span>°c</span>`;

    let weather_2 = document.querySelector('.weatherLocation_2');
    weather_2.innerText = weather.list[16].weather[0].main;

    let highlow_2 = document.querySelector('.high-lowLocation_2');
    highlow_2.innerText = `${Math.round(weather.list[16].main.temp_max-273)}°c / ${Math.round(weather.list[16].main.temp_min-273)}°c`;



    let now_3 = new Date(new Date(new Date().getTime() + 86400000 * 3));
    let date_3 = document.querySelector('.dateLocation_3');
    date_3.innerText = dateBuilder(now_3);

    let icon_3 = document.querySelector('.iconLocation_3');
    iconID = weather.list[24].weather[0].icon;
    icon_3.innerHTML = `<img src="icons/${iconID}.png"/>`;

    let temp_3 = document.querySelector('.tempLocation_3');
    temp_3.innerHTML = `${Math.round(weather.list[24].main.temp)-273}<span>°c</span>`;

    let weather_3 = document.querySelector('.weatherLocation_3');
    weather_3.innerText = weather.list[24].weather[0].main;

    let highlow_3 = document.querySelector('.high-lowLocation_3');
    highlow_3.innerText = `${Math.round(weather.list[24].main.temp_max-273)}°c / ${Math.round(weather.list[24].main.temp_min-273)}°c`;
}
