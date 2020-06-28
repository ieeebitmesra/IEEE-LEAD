/*------------From the HTML--------------------------------*/
let result = document.getElementById("result")
let display_results = document.querySelector('.results')
let location = document.querySelector('#location')
let button = document.querySelector('.search_button')
let description = document.querySelector('.desc')
let temperature = document.querySelector('.temp')
let weather_date = document.querySelector('.weather_date')
let latitude = document.querySelector('.lat')
let longitude = document.querySelector('.long')
let humidity = document.querySelector('.humidity')
let wind = document.querySelector('.wind')
let box = document.querySelector('.box')
let leftslide = document.getElementById('leftslide')
let rightslide = document.getElementById('rightslide')
/*------------From the HTML--------------------------------*/
const apiID = 'ce74ce40545b40e7266cc1f223f7f38c'

let img_name, lat_value, lon_value, desc_val, temp_val, humid_value, wind_value
let count = 0
let var_date = new Date();
let var_dt = Math.round((var_date.getTime())/1000)

const weatherImage = {
    clouds:1,
    rain:1,
    clear:1,
    thunderstrom:1,
    snow:1,
    tornado:1,
    drizzle:1,
    haze:1,
    mist:1,
}


setHeaderDate();
getLocation();
button.addEventListener('click', getWeather);

/*-----------------------------Function to set background image--------------------------------------------*/
function setBackImage(img_name){
    if (weatherImage[img_name.toLowerCase()] == 1){
        box.style.backgroundImage = 'url(./resources/images/'+img_name+'.jpg)';
    }else{
        box.style.backgroundImage = 'url(./resources/images/landscape.png)';
    }
}
/*-----------------------------Function to set background image--------------------------------------------*/

/*-----------------------------Function fetching weather data---------------------------------------------*/
//current weather and forecast data
function getCurrentWeather(count){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat_value+"&lon="+lon_value+"&units=metric&exclude=hourly,currently&appid="+apiID)
    .then(resp1 => resp1.json())
    .then(weather => {
        console.log(weather)
        desc_val = weather['daily'][count]['weather'][0]['description'];
        temp_val = Math.round(weather['daily'][count]['temp']['day']);
        humid_value = weather['daily'][count]['humidity'];
        wind_value = weather['daily'][count]['wind_speed'];
        img_name = weather['daily'][count]['weather'][0]['main'];

        weather_date.innerHTML = set_Date(var_date);
        description.innerHTML = desc_val;
        temperature.innerHTML = temp_val;
        humidity.innerHTML = humid_value+" %";
        wind.innerHTML = wind_value+" m/s";
        console.log(img_name)
        setBackImage(img_name)
    })
}

//past weather data
function getPastWeather(){
    fetch("https://api.openweathermap.org/data/2.5/onecall/timemachine?lat="+lat_value+"&lon="+lon_value+"&units=metric&dt="+var_dt+"&appid="+apiID)
    .then(resp2 => resp2.json())
    .then(past_weather =>{
        console.log(past_weather)
        desc_val = past_weather['current']['weather'][0]['description'];
        temp_val = Math.round(past_weather['current']['temp']);
        humid_value = past_weather['current']['humidity'];
        wind_value = past_weather['current']['wind_speed'];
        img_name = past_weather['current']['weather'][0]['main'];

        weather_date.innerHTML = set_Date(var_date);
        description.innerHTML = desc_val;
        temperature.innerHTML = temp_val;
        humidity.innerHTML = humid_value+" %";
        wind.innerHTML = wind_value+" m/s";
        console.log(img_name)
        setBackImage(img_name)
    })
}
/*-----------------------------Function fetching weather data----------------------------------------------*/

/*-----------------------------Next and previous Buttons----------------------------------------------*/
rightslide.addEventListener('click',() => {
    if(count<7){
        count+=1;
        var_date.setDate(var_date.getDate()+1)
        var_dt = Math.round((var_date.getTime())/1000)
        if(count>=0 && count<8)
            getCurrentWeather(count);
        else if(count>-6 && count<0)
            getPastWeather()
    }
})
leftslide.addEventListener('click',() => {
    if(count>-5){
        count-=1;
        var_date.setDate(var_date.getDate()-1)
        var_dt = Math.round((var_date.getTime())/1000)
        if(count>=0 && count<8)
            getCurrentWeather(count);
        else if(count>-6 && count<0)
            getPastWeather()
    }    
})
/*-----------------------------Next and previous Buttons----------------------------------------------*/

/*-----------------------------Search function----------------------------------------------*/
function getWeather(){
    setTimeout(() => display_results.style.opacity = "0", 200);
    result.style.display = "none";
    loader.style.display = "flex";
    setTimeout(() => loader.style.opacity = "1", 200);

    var_date = new Date();
    count = 0;

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+location.value+'&appid='+apiID)
    .then(response => response.json())
    .then(data => {
        location.value = data['name']+', '+data['sys']['country'];
        lat_value = data['coord']['lat'];
        lon_value = data['coord']['lon'];
        let dir_lat = ' N', dir_lon = ' E'
        if (lat_value<0)  dir_lat = ' S' 
        if (lon_value<0)  dir_lon = ' W'
        latitude.innerHTML = Math.abs(lat_value)+dir_lat;
        longitude.innerHTML = Math.abs(lon_value)+dir_lon;
        
        getCurrentWeather(count)

        setTimeout(() => loader.style.opacity = "0", 200);
            loader.style.display = "none";
            result.style.display = "block";
            setTimeout(() => display_results.style.opacity = "1", 200);
    }).catch(() => alert("Please check location entered and try again"))
}
/*-----------------------------Search function----------------------------------------------*/

/*----------------------------Function to get current location------------------------------*/
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    lat_value = position.coords.latitude;
    lon_value = position.coords.longitude
    //console.log("Latitude: " + lat_value + "Longitude: " + lon_value);

    setTimeout(() => display_results.style.opacity = "0", 200);
    result.style.display = "none";
    loader.style.display = "flex";
    setTimeout(() => loader.style.opacity = "1", 200);

    var_date = new Date();
    count = 0;

    getCurrentWeather(count)

    setTimeout(() => loader.style.opacity = "0", 200);
        loader.style.display = "none";
        result.style.display = "block";
        setTimeout(() => display_results.style.opacity = "1", 200);
  }
/*----------------------------Function to get current location------------------------------*/

/*--------------------------------------------------Function to get current date---------------------------------------------------------------*/
function set_Date(display_date) {
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = monthNames[display_date.getMonth()] +' '+ display_date.getDate()
    return date;
}

function set_Day(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date();
    let day = weekday[today.getDay()];
    return day;
}
/*--------------------------------------------------Function to get current date---------------------------------------------------------------*/

/*--------------------------------------------------Function to set current date---------------------------------------------------------------*/

function setHeaderDate(){
    var current_date = document.getElementById('date');
    const today = new Date();
    current_date.innerHTML = "<strong>" + set_Day() + "</strong>, " + set_Date(today);
}
/*--------------------------------------------------Function to set current date---------------------------------------------------------------*/