// For getting Geolocation of a place

let seachbar = document.getElementById("location");
let allWeatherCards = document.querySelectorAll(".weather-info");

const getGeoLocation = async (str) => {
  let key =
    "pk.eyJ1IjoiYXNodXRvc2gxNzI5IiwiYSI6ImNrYnFkYnVuYTFyd24yeHA5dmVreHJhZGoifQ.VQ7C7oKEwPcY8Iu1NEf-Nw";
  url = encodeURI(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?access_token=${key}`
  );
  try {
    response = await fetch(url);
    data = await response.json();
    seachbar.value = data.features[0]["place_name"];
    return data.features[0]["center"];
  } catch (error) {
    alert("Something went Wrong!! Please try again");
  }
};

// For adding objects to weatherdata array

const addData = (weatherdata, data, future, epoch, timezone_offset) => {
  let temperature;
  let weather;
  let humidity;
  let windSpeed;
  let dt;
  if (future === 0) {
    dt = new Date(epoch * 1000 - timezone_offset[0] * 1000);
    temperature = data["current"]["temp"];
    weather = data["current"]["weather"][0]["main"];
    humidity = data["current"]["humidity"];
    windSpeed = data["current"]["wind_speed"];
  } else {
    dt = new Date();
    temperature = data["temp"]["day"];
    weather = data["weather"][0]["main"];
    humidity = data["humidity"];
    windSpeed = data["wind_speed"];
  }
  weatherdata.push({
    dt,
    weather,
    temperature,
    humidity,
    windSpeed,
  });
};

// For getting weather of past

const pastWeather = async (
  weatherdata,
  latitude,
  longitude,
  timezone_offset,
  currentUTC
) => {
  let key = "f7116a6b23dc008193783bfdb74b4038";

  const seconds_in_a_day = 24 * 60 * 60;
  let epoch = currentUTC[0];

  for (let i = 1; i <= 5; i++) {
    epoch -= seconds_in_a_day;
    url = encodeURI(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${epoch}&units=metric&appid=${key}`
    );
    try {
      let response = await fetch(url);
      let data = await response.json();
      addData(weatherdata, data, 0, epoch, timezone_offset);
    } catch (error) {
      alert("Something went Wrong!! Please try again");
    }
  }
};

// For weather forecast

const forecastWeather = async (
  weatherdata,
  latitude,
  longitude,
  timezone_offset,
  currentUTC
) => {
  let key = "f7116a6b23dc008193783bfdb74b4038";
  url = encodeURI(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={minutely,hourly}&units=metric&appid=${key}`
  );
  try {
    let response = await fetch(url);
    let data = await response.json();
    timezone_offset.push(data["timezone_offset"]);
    currentUTC.push(data["current"]["dt"]);
    for (let i = data["daily"].length - 1; i >= 0; i--) {
      addData(weatherdata, data["daily"][i], 1, currentUTC, timezone_offset);

      weatherdata[data["daily"].length - 1 - i].dt = new Date(
        currentUTC[0] * 1000 -
          timezone_offset[0] * 1000 +
          i * 24 * 60 * 60 * 1000
      );
    }
  } catch (error) {
    alert("Something went Wrong!! Please try again");
  }
};

// Main function that returns the array containing weather data

const getWeather = async () => {
  let weatherdata = [];
  let timezone_offset = [];
  let currentUTC = [];
  try {
    let location = await getGeoLocation(seachbar.value);
    await forecastWeather(
      weatherdata,
      location[1],
      location[0],
      timezone_offset,
      currentUTC
    );
    await pastWeather(
      weatherdata,
      location[1],
      location[0],
      timezone_offset,
      currentUTC
    );
  } catch (error) {
    alert("Something went Wrong!! Please try again");
  }
  return weatherdata;
};

let headerDate = document.querySelector("#date-header");

// For getting day of the week

let dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// For getting month of the year

let MonthOfYear = new Array(12);
MonthOfYear[0] = "January";
MonthOfYear[1] = "February";
MonthOfYear[2] = "March";
MonthOfYear[3] = "April";
MonthOfYear[4] = "May";
MonthOfYear[5] = "June";
MonthOfYear[6] = "July";
MonthOfYear[7] = "August";
MonthOfYear[8] = "September";
MonthOfYear[9] = "October";
MonthOfYear[10] = "November";
MonthOfYear[11] = "December";

// For getting suffix of the date

const suffix = (date) => {
  if (date >= 11 && date <= 13) {
    return "th";
  }
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

let today = new Date();

headerDate.innerHTML = `<strong>${
  dayOfWeek[today.getDay()]
}</strong>,  ${today.getDate()}${suffix(today.getDate())} ${
  MonthOfYear[today.getMonth()]
}`;

let button = document.getElementById("btn");

// Selecting everything that is need to be filled

let locationDate = document.querySelectorAll(".location-date");
let tempInfo = document.querySelectorAll(".temp-info");
let weatherType = document.querySelectorAll(".weather-type");
let humidity = document.querySelectorAll(".humidity");
let windSpeed = document.querySelectorAll(".wind-speed");

button.addEventListener("click", () => {
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  let forward = document.getElementById("forward");
  forward.disabled = true;
  forward.style.cursor = "default";
  let backward = document.getElementById("backward");
  backward.disabled = true;
  backward.style.cursor = "default";

  getWeather()
    .then((weatherdata) => {
      if (weatherdata.length == 0) {
        loader.style.display = "none";
        document.querySelector(".carousel-slide").style.display = "none";
        document.querySelectorAll(".weather-info")[5].style.display = "none";
        document.querySelector("#forward").style.display = "none";
        document.querySelector("#backward").style.display = "none";
      } else {
        let index = -1;
        for (let i = weatherdata.length - 1; i >= 0; i--) {
          index = weatherdata.length - 1 - i;
          locationDate[index].innerHTML = `${weatherdata[
            i
          ].dt.getDate()}${suffix(weatherdata[i].dt.getDate())} ${
            MonthOfYear[weatherdata[i].dt.getMonth()]
          }`;
          tempInfo[index].innerHTML =
            weatherdata[i]["temperature"] + "<sup>o</sup>" + "&nbsp" + "C";
          weatherType[index].innerHTML = weatherdata[i].weather;
          if (
            weatherdata[i].weather === "Smoke" ||
            weatherdata[i].weather === "Sand" ||
            weatherdata[i].weather === "Dust"
          ) {
            allWeatherCards[index].style.backgroundImage =
              "url(images/Smoke.jpg)";
          } else {
            if (weatherdata[i].weather === "Clear") {
              allWeatherCards[index].style.color = "black";
            }
            allWeatherCards[
              index
            ].style.backgroundImage = `url(images/${weatherdata[i].weather}.jpg)`;
          }
          humidity[index].innerHTML = `${weatherdata[i].humidity}%`;
          windSpeed[index].innerHTML = `${Math.round(
            weatherdata[i].windSpeed
          )} m/s`;
        }
        loader.style.display = "none";
        document.querySelector(".carousel-slide").style.display = "block";
        document.querySelectorAll(".weather-info")[5].style.display = "flex";
        document.querySelector("#forward").style.display = "block";
        document.querySelector("#backward").style.display = "block";
        forward.disabled = false;
        forward.style.cursor = "pointer";
        backward.disabled = false;
        backward.style.cursor = "pointer";
      }
    })
    .catch((error) => {
      alert("Something went Wrong!! Please try again");
    });
});

let activeCard = new Array(allWeatherCards.length).fill(0);
activeCard[5] = 1;

window.addEventListener("load", () => {
  let forward = document.querySelector("#forward");
  forward.disabled = false;
  forward.style.cursor = "pointer";
  forward.addEventListener("click", () => {
    for (let i = 0; i < activeCard.length; i++) {
      if (activeCard[i] == 1) {
        allWeatherCards[i].style.display = "none";
        activeCard[i] = 0;
        if (i == activeCard.length - 1) {
          allWeatherCards[0].style.display = "flex";
          activeCard[0] = 1;
        } else {
          allWeatherCards[i + 1].style.display = "flex";
          activeCard[i + 1] = 1;
        }
        break;
      }
    }
  });
  let backward = document.querySelector("#backward");
  backward.disabled = false;
  backward.style.cursor = "pointer";
  backward.addEventListener("click", () => {
    for (let i = 0; i < activeCard.length; i++) {
      if (activeCard[i] == 1) {
        allWeatherCards[i].style.display = "none";
        activeCard[i] = 0;
        if (i == 0) {
          allWeatherCards[activeCard.length - 1].style.display = "flex";
          activeCard[activeCard.length - 1] = 1;
        } else {
          allWeatherCards[i - 1].style.display = "flex";
          activeCard[i - 1] = 1;
        }
        break;
      }
    }
  });
});
