function showTime(){                      //to find exact time
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    
    
  
    if(h < 10){
        h = "0" + h;
    }
  
    if(m < 10){
        m = "0" + m;
    }
  
    if(s < 10){
        s = "0" + s;
    }
  
    var time = h + ":" + m + ":" + s;
  
    document.getElementById("clockdisplay").innerText = time;
    document.getElementById("clockdisplay").textContent = time;  //to support in all browsers
  
    setTimeout(showTime, 1000);
}
  showTime();

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

    if(weather.weather[0].main === 'Clouds'){
      document.body.style.background = "url('pics/clouds.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Clear'){
      document.body.style.background = "url('pics/clear.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Rain'){
      document.body.style.background = "url('pics/rain.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Haze'){
      document.body.style.background = "url('pics/haze.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Snow'){
      document.body.style.background = "url('pics/snow.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Thunderstorm'){
      document.body.style.background = "url('pics/thunderstorm.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Mist'){
      document.body.style.background = "url('pics/mist.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Smoke'){
      document.body.style.background = "url('pics/smoke.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else if(weather.weather[0].main === 'Fog'){
      document.body.style.background = "url('pics/fog.jpg')";
      document.body.style.backgroundSize = "cover";
    }
    else{
      document.body.style.background = "url('pics/default.jpg')";
      document.body.style.backgroundSize = "cover";
    }

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
    getPrevious1(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);
    getPrevious2(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);
    getPrevious3(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);
    getPrevious4(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);


    getAfter(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);
    getAfter1(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);
    getAfter2(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);
    getAfter3(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);
    getAfter4(`${weather.coord.lat}`, `${weather.coord.lon}`, `${weather.dt}`);


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

    let yesterday = new Date(new Date().getTime() - 86400000);
    let predate = document.querySelector('.previous .predate');
    predate.innerText = dateBuilder(yesterday);

    let prevary = document.querySelector('.previous .prevary');
    prevary.innerHTML = `${xweather.hourly[0].temp}°C / ${xweather.hourly[23].temp}°C`;
    
    let pretype = document.querySelector('.previous .pretype');
    pretype.innerHTML = `${xweather.current.weather[0].main}`;

    
  }

  function getPrevious1(latp, longp, predate) {    //to fetch weather of previous days
    predate = (predate - 86400*2);
    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latp}&lon=${longp}&dt=${predate}&units=metric&appid=${api.key}`)
    .then(function(presp1) {
      return presp1.json();
    })
    .then(function(predata1) {
      
      displayXresults1(predata1);
    })
    .catch(function() {});
 }

 function displayXresults1(xweather1) {            //to display weather of previous days

  let yesterday1 = new Date(new Date().getTime() - 86400000*2);
  let predate1 = document.querySelector('.previous .predate1');
  predate1.innerText = dateBuilder(yesterday1);

  let prevary1 = document.querySelector('.previous .prevary1');
  prevary1.innerHTML = `${xweather1.hourly[0].temp}°C / ${xweather1.hourly[23].temp}°C`;
  
  let pretype1 = document.querySelector('.previous .pretype1');
  pretype1.innerHTML = `${xweather1.current.weather[0].main}`;

  
}

function getPrevious2(latp, longp, predate) {    //to fetch weather of previous days
  predate = (predate - 86400*3);
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latp}&lon=${longp}&dt=${predate}&units=metric&appid=${api.key}`)
  .then(function(presp2) {
    return presp2.json();
  })
  .then(function(predata2) {
    
    displayXresults2(predata2);
  })
  .catch(function() {});
}

function displayXresults2(xweather2) {            //to display weather of previous days

  let yesterday2 = new Date(new Date().getTime() - 86400000*3);
  let predate2 = document.querySelector('.previous .predate2');
  predate2.innerText = dateBuilder(yesterday2);

  let prevary2 = document.querySelector('.previous .prevary2');
  prevary2.innerHTML = `${xweather2.hourly[0].temp}°C / ${xweather2.hourly[23].temp}°C`;
  
  let pretype2 = document.querySelector('.previous .pretype2');
  pretype2.innerHTML = `${xweather2.current.weather[0].main}`;

  
}

function getPrevious3(latp, longp, predate) {    //to fetch weather of previous days
  predate = (predate - 86400*4);
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latp}&lon=${longp}&dt=${predate}&units=metric&appid=${api.key}`)
  .then(function(presp3) {
    return presp3.json();
  })
  .then(function(predata3) {
    
    displayXresults3(predata3);
  })
  .catch(function() {});
}

function displayXresults3(xweather3) {            //to display weather of previous days

  let yesterday3 = new Date(new Date().getTime() - 86400000*4);
  let predate3 = document.querySelector('.previous .predate3');
  predate3.innerText = dateBuilder(yesterday3);

  let prevary3 = document.querySelector('.previous .prevary3');
  prevary3.innerHTML = `${xweather3.hourly[0].temp}°C / ${xweather3.hourly[23].temp}°C`;
  
  let pretype3 = document.querySelector('.previous .pretype3');
  pretype3.innerHTML = `${xweather3.current.weather[0].main}`;

  
}

function getPrevious4(latp, longp, predate) {    //to fetch weather of previous days
  predate = (predate - 86400*5);
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latp}&lon=${longp}&dt=${predate}&units=metric&appid=${api.key}`)
  .then(function(presp4) {
    return presp4.json();
  })
  .then(function(predata4) {
    
    displayXresults4(predata4);
  })
  .catch(function() {});
}

function displayXresults4(xweather4) {            //to display weather of previous days

  let yesterday4 = new Date(new Date().getTime() - 86400000*5);
  let predate4 = document.querySelector('.previous .predate4');
  predate4.innerText = dateBuilder(yesterday4);

  let prevary4 = document.querySelector('.previous .prevary4');
  prevary4.innerHTML = `${xweather4.hourly[0].temp}°C / ${xweather4.hourly[23].temp}°C`;
  
  let pretype4 = document.querySelector('.previous .pretype4');
  pretype4.innerHTML = `${xweather4.current.weather[0].main}`;

  
}

function getAfter(lata, longa, postdate) {    //to fetch weather of future days
  postdate = (postdate + 86400);
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lata}&lon=${longa}&exclude=daily&units=metric&appid=${api.key}`)
  .then(function(aresp) {
    return aresp.json();
  })
  .then(function(postdata) {
    
    displayFresults(postdata);
  })
  .catch(function() {});
}

function displayFresults(aweather) {            //to display weather of future days

 let tomorrow = new Date(new Date().getTime() + 86400000);
 let postdate = document.querySelector('.future .postdate');
 postdate.innerText = dateBuilder(tomorrow);

 let postvary = document.querySelector('.future .postvary');
 postvary.innerHTML = `${aweather.hourly[0].temp}°C / ${aweather.hourly[23].temp}°C`;
 
 let posttype = document.querySelector('.future .posttype');
 posttype.innerHTML = `${aweather.current.weather[0].main}`;

 
}

function getAfter1(lata, longa, postdate) {    //to fetch weather of future days
  postdate = (postdate + 86400*2);
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lata}&lon=${longa}&units=metric&appid=${api.key}`)
  .then(function(aresp1) {
    return aresp1.json();
  })
  .then(function(postdata1) {
    
    displayFresults1(postdata1);
  })
  .catch(function() {});
}

function displayFresults1(aweather1) {            //to display weather of future days

 let tomorrow1 = new Date(new Date().getTime() + 86400000*2);
 let postdate1 = document.querySelector('.future .postdate1');
 postdate1.innerText = dateBuilder(tomorrow1);

 let postvary1 = document.querySelector('.future .postvary1');
 postvary1.innerHTML = `${aweather1.hourly[0].temp}°C / ${aweather1.hourly[23].temp}°C`;
 
 let posttype1 = document.querySelector('.future .posttype1');
 posttype1.innerHTML = `${aweather1.current.weather[0].main}`;

 
}

function getAfter2(lata, longa, postdate) {    //to fetch weather of future days
  postdate = (postdate + 86400*3);
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lata}&lon=${longa}&exclude=daily&units=metric&appid=${api.key}`)
  .then(function(aresp2) {
    return aresp2.json();
  })
  .then(function(postdata2) {
    
    displayFresults2(postdata2);
  })
  .catch(function() {});
}

function displayFresults2(aweather2) {            //to display weather of future days

 let tomorrow2 = new Date(new Date().getTime() + 86400000*3);
 let postdate2 = document.querySelector('.future .postdate2');
 postdate2.innerText = dateBuilder(tomorrow2);

 let postvary2 = document.querySelector('.future .postvary2');
 postvary2.innerHTML = `${aweather2.hourly[0].temp}°C / ${aweather2.hourly[23].temp}°C`;
 
 let posttype2 = document.querySelector('.future .posttype2');
 posttype2.innerHTML = `${aweather2.current.weather[0].main}`;

 
}

function getAfter3(lata, longa, postdate) {    //to fetch weather of future days
  postdate = (postdate + 86400*4);
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lata}&lon=${longa}&units=metric&appid=${api.key}`)
  .then(function(aresp3) {
    return aresp3.json();
  })
  .then(function(postdata3) {
    
    displayFresults3(postdata3);
  })
  .catch(function() {});
}

function displayFresults3(aweather3) {            //to display weather of future days

 let tomorrow3 = new Date(new Date().getTime() + 86400000*4);
 let postdate3 = document.querySelector('.future .postdate3');
 postdate3.innerText = dateBuilder(tomorrow3);

 let postvary3 = document.querySelector('.future .postvary3');
 postvary3.innerHTML = `${aweather3.hourly[0].temp}°C / ${aweather3.hourly[23].temp}°C`;
 
 let posttype3 = document.querySelector('.future .posttype3');
 posttype3.innerHTML = `${aweather3.current.weather[0].main}`;

 
}

function getAfter4(lata, longa, postdate) {    //to fetch weather of future days
  postdate = (postdate + 86400*5);
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lata}&lon=${longa}&units=metric&appid=${api.key}`)
  .then(function(aresp4) {
    return aresp4.json();
  })
  .then(function(postdata4) {
    
    displayFresults4(postdata4);
  })
  .catch(function() {});
}

function displayFresults4(aweather4) {            //to display weather of future days

 let tomorrow4 = new Date(new Date().getTime() + 86400000*5);
 let postdate4 = document.querySelector('.future .postdate4');
 postdate4.innerText = dateBuilder(tomorrow4);

 let postvary4 = document.querySelector('.future .postvary4');
 postvary4.innerHTML = `${aweather4.hourly[0].temp}°C / ${aweather4.hourly[23].temp}°C`;
 
 let posttype4 = document.querySelector('.future .posttype4');
 posttype4.innerHTML = `${aweather4.current.weather[0].main}`;

 
}

function dateBuilder (d) {     //to get the date 
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

