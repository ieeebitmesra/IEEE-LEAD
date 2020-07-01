// For selecting all of the weather cards
let allWeatherCards = document.querySelectorAll(".weather-info");

// Array for knowing which weather card is the active weather card
let activeCard = new Array(allWeatherCards.length).fill(0);
let seachbar = document.getElementById("location");

// Selecting everything that is needed to be filled

let locationDate = document.querySelectorAll(".location-date");
let tempInfo = document.querySelectorAll(".temp-info");
let weatherType = document.querySelectorAll(".weather-type");
let humidity = document.querySelectorAll(".humidity");
let windSpeed = document.querySelectorAll(".wind-speed");

// Function for displaying the Loader when data is being fetched

const showLoader = () => {
  document.querySelector(".carousel-slide").style.display = "none";
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.getElementById("forward").style.display = "none";
  document.getElementById("backward").style.display = "none";
};

// Function for removing the loader when data is to be shown

const removeLoader = () => {
  let loader = document.querySelector(".loader");
  loader.style.display = "none";
  document.querySelector(".carousel-slide").style.display = "block";
  document.querySelectorAll(".weather-info")[5].style.display = "flex";
  activeCard[5] = 1;
  document.querySelector("#forward").style.display = "block";
  document.querySelector("#backward").style.display = "block";
};

// Function to remove both loader and Card when error occurs

const removeLoaderAndCards = () => {
  let loader = document.querySelector(".loader");
  loader.style.display = "none";
  document.querySelector(".carousel-slide").style.display = "none";
  document.querySelectorAll(".weather-info")[5].style.display = "none";
  document.querySelector("#forward").style.display = "none";
  document.querySelector("#backward").style.display = "none";
};

// For adding objects to weatherdata array

const addData = (weatherdata, data, future, epoch, timezone_offset) => {
  let temperature;
  let weather;
  let humidity;
  let windSpeed;
  let dt;
  if (future === 0) {
    dt = new Date((epoch + timezone_offset[0]) * 1000);
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
      throw new Error("Something went Wrong!! Please try again");
    }
  }
};

// For getting weather forecast

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
    let utc_time_in_milliseconds = new Date().getTime();
    currentUTC.push(Math.round(utc_time_in_milliseconds / 1000));
    for (let i = data["daily"].length - 1; i >= 0; i--) {
      addData(weatherdata, data["daily"][i], 1, currentUTC, timezone_offset);

      weatherdata[data["daily"].length - 1 - i].dt = new Date(
        currentUTC[0] * 1000 +
          timezone_offset[0] * 1000 +
          i * 24 * 60 * 60 * 1000
      );
    }
  } catch (error) {
    throw new Error("Something went Wrong!! Please try again");
  }
};

// For reverse geocoding when showing weather of current location

const getPlaceName = async (latitude, longitude) => {
  let key =
    "pk.eyJ1IjoiYXNodXRvc2gxNzI5IiwiYSI6ImNrYnFkYnVuYTFyd24yeHA5dmVreHJhZGoifQ.VQ7C7oKEwPcY8Iu1NEf-Nw";
  try {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${key}`;
    let results = await fetch(url);
    let data = await results.json();
    let place_name = data["features"][0]["place_name"];
    document.getElementById("location").value = place_name;
  } catch (error) {
    throw new Error("Something went wrong! Please try again");
  }
};

// For getting current location coordinates

const getCurrentGeolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
    });
  });
};

// Function for getting all the data for current location

const getCurrentWeather = async () => {
  let weatherdata = [];
  let timezone_offset = [];
  let currentUTC = [];
  try {
    let location = await getCurrentGeolocation();
    showLoader();
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    await getPlaceName(latitude, longitude);
    await forecastWeather(
      weatherdata,
      latitude,
      longitude,
      timezone_offset,
      currentUTC
    );
    await pastWeather(
      weatherdata,
      latitude,
      longitude,
      timezone_offset,
      currentUTC
    );
  } catch (error) {
    throw error;
  }
  return weatherdata;
};

// Function for getting the coordinates for specified location

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
    throw new Error("Cannot locate this place");
  }
};

// Function for getting all the data for specified location

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
    throw error;
  }
  return weatherdata;
};

const addDataInCards = (weatherdata) => {
  let index = -1;
  for (let i = weatherdata.length - 1; i >= 0; i--) {
    index = weatherdata.length - 1 - i;
    allWeatherCards[index].style.color = "white";
    document.querySelectorAll(".separator")[index].style.border =
      "1px solid white";
    if (index == 4) {
      locationDate[index].innerHTML = "YESTERDAY";
    } else if (index == 5) {
      locationDate[index].innerHTML = "TODAY";
    } else if (index == 6) {
      locationDate[index].innerHTML = "TOMORROW";
    } else {
      locationDate[index].innerHTML = `${weatherdata[
        i
      ].dt.getUTCDate()}${suffix(weatherdata[i].dt.getUTCDate())} ${
        MonthOfYear[weatherdata[i].dt.getUTCMonth()]
      }`;
    }

    tempInfo[index].innerHTML =
      weatherdata[i]["temperature"] + "<sup>o</sup>" + "&nbsp" + "C";
    weatherType[index].innerHTML = weatherdata[i].weather;
    if (
      weatherdata[i].weather === "Smoke" ||
      weatherdata[i].weather === "Sand" ||
      weatherdata[i].weather === "Dust"
    ) {
      allWeatherCards[index].style.backgroundImage = "url(images/Smoke.jpg)";
    } else {
      if (weatherdata[i].weather === "Clear") {
        allWeatherCards[index].style.color = "black";
        document.querySelectorAll(".separator")[index].style.border =
          "1px solid black";
      }
      allWeatherCards[
        index
      ].style.backgroundImage = `url(images/${weatherdata[i].weather}.jpg)`;
    }
    humidity[index].innerHTML = `${weatherdata[i].humidity}%`;
    windSpeed[index].innerHTML = `${Math.round(weatherdata[i].windSpeed)} m/s`;
  }
};

// Function for running the current weather

getCurrentWeather()
  .then((weatherdata) => {
    addDataInCards(weatherdata);
    removeLoader();
  })
  .catch((error) => {
    removeLoaderAndCards();
    if (error.code == 1) {
    } else if (error.code == 2) {
      alert("Position Unavailable at the moment!!");
    } else if (error.code == 3) {
      alert("Position Unavailable at the moment!!");
    } else {
      alert(error.message);
    }
  });

// Keybinding for "Enter" key

seachbar.addEventListener("keydown", (key) => {
  if (key.which == 13) {
    if (seachbar.value.length == 0) {
      alert("Please enter a location");
    } else {
      showLoader();
      let active = activeCard.indexOf(1);
      if (active != -1) {
        allWeatherCards[active].style.display = "none";
        activeCard[active] = 0;
      }

      getWeather()
        .then((weatherdata) => {
          addDataInCards(weatherdata);
          removeLoader();
        })
        .catch((error) => {
          removeLoaderAndCards();
          alert(error);
        });
    }
  }
});

// Keybinding for array keys "left" and "right"

window.addEventListener("keydown", (key) => {
  if (key.which == 39) {
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
  } else if (key.which == 37) {
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
  }
});

// For setting date in the top of the website
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

// Added event listener for showing the results

button.addEventListener("click", () => {
  if (seachbar.value.length == 0) {
    alert("Please enter a location");
  } else {
    showLoader();
    let active = activeCard.indexOf(1);
    if (active != -1) {
      allWeatherCards[active].style.display = "none";
      activeCard[active] = 0;
    }

    getWeather()
      .then((weatherdata) => {
        addDataInCards(weatherdata);
        removeLoader();
      })
      .catch((error) => {
        removeLoaderAndCards();
        alert(error);
      });
  }
});

// Event listener for right button

let forward = document.querySelector("#forward");
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

// Event listener for left button

let backward = document.querySelector("#backward");
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
