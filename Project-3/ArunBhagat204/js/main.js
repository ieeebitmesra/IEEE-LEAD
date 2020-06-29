(function($) {

    var nav = $('nav');
    var navHeight = nav.outerHeight();
    // Smooth Scrolling of Nav links
    $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
        var target = $(this.hash);
        $('html, body').animate({
        scrollTop: (target.offset().top - navHeight + 5)
        }, 1000, "easeInOutExpo");
    });

    // Activate scrollspy to add class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: navHeight
    });

    // Reduction of NavBar
    $(window).trigger('scroll');
    $(window).on('scroll', function() {
        var pixels = 50;
        var top = 1200;
        if ($(window).scrollTop() > pixels) {
            $('.navbar-expand-md').addClass('navbar-reduce');
            $('.navbar-expand-md').removeClass('navbar-trans');
            $( ".locInput" ).animate({
                width: "350px", 
                 }, 1000 );
        } else {
            $('.navbar-expand-md').addClass('navbar-trans');
            $('.navbar-expand-md').removeClass('navbar-reduce');
        }
        if ($(window).scrollTop() > top) {
            $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
        } else {
            $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
        } 
    });

    // Typing Effect Settings
    if ($('.text-slider').length == 1) {
        var typed_strings = $('.text-slider-items').text();
        var typed = new Typed('.text-slider', {
            strings: typed_strings.split(','),
            typeSpeed: 80,
            loop: true,
            backDelay: 1100,
            backSpeed: 30
        });
    }

    $(".slideshow > div:gt(0)").hide();
    setInterval(function() { 
    $('.slideshow > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('.slideshow');
    },  3000);

    
    
})(jQuery);

//Setting default dates
window.forecastStartDate = new(Date);
window.forecastEndDate = new(Date);
window.forecastEndDate.setDate(window.forecastStartDate.getDate()+1);

// Getting Location On Page-Load
window.onload = function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            var currentLatitude = position.coords.latitude;
            var currentLongitude = position.coords.longitude;
            window.lat = currentLatitude;
            window.lng = currentLongitude;
            console.log("Current latitude : " + currentLatitude);
            console.log("Current longitude : " + currentLongitude);
            document.getElementById("locCoords").innerHTML = `(Lat : ${String(currentLatitude).slice(0,6)}, Lng  : ${String(currentLongitude).slice(0,6)})`;
            document.getElementById("curCoords").innerHTML = `(Lat : ${String(currentLatitude).slice(0,6)}, Lng  : ${String(currentLongitude).slice(0,6)})`;
            document.getElementById("forCoords").innerHTML = `(Lat : ${String(currentLatitude).slice(0,6)}, Lng  : ${String(currentLongitude).slice(0,6)})`;
            document.getElementById("hisCoords").innerHTML = `(Lat : ${String(currentLatitude).slice(0,6)}, Lng  : ${String(currentLongitude).slice(0,6)})`;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${currentLatitude}+${currentLongitude}&key=e95f1b39fa474af9bd4d6e2d9a458eb8`)
            .then((response) => {
                return response.json();
            }).then((obj) => {
                console.log(obj);
                var countryName = obj.results[0].components.country;
                var stateName = obj.results[0].components.state;
                var cityName = obj.results[0].components.city;
                var timeZoneRegion = obj.results[0].annotations.timezone.name;
                var timeLag = obj.results[0].annotations.timezone.offset_string;
                var timeZone = obj.results[0].annotations.timezone.short_name;
                if(String(cityName) == "undefined"){
                    cityName = obj.results[0].components.county;
                }
                console.log(`Place : ${cityName}, ${stateName}, ${countryName}`)
                document.getElementById("locCityName").innerHTML = cityName;
                document.getElementById("locStateName").innerHTML = stateName + ", " + countryName;
                document.getElementById("curCityName").innerHTML = cityName;
                document.getElementById("curStateName").innerHTML = stateName + ", " + countryName;
                document.getElementById("forCityName").innerHTML = cityName;
                document.getElementById("forStateName").innerHTML = stateName + ", " + countryName;
                document.getElementById("hisCityName").innerHTML = cityName;
                document.getElementById("hisStateName").innerHTML = stateName + ", " + countryName;
                document.getElementById("hisTimezone").innerHTML = timeZone;
                document.getElementById("hisTimeRegion").innerHTML = timeZoneRegion;
                document.getElementById("hisTime").innerHTML = timeLag;
            })
            fetch(`https://api.weatherbit.io/v2.0/current/daily?&lat=${currentLatitude}&lon=${currentLongitude}&key=7a633a1c626a40e7a9b329eeee978b0e`)
            .then((response) => {
                return response.json();
            }).then((obj) => {
                console.log(obj);

                //Assigning Current Weather and Intro page data
                var temp = obj.data[0].temp;
                var desc = obj.data[0].weather.description;
                var appTemp = obj.data[0].app_temp;
                var prec = obj.data[0].precip;
                var humid = obj.data[0].rh;
                var clouds = obj.data[0].clouds;
                var wind = obj.data[0].wind_spd;
                var pres = obj.data[0].pres;
                var snow = obj.data[0].snow;
                var uv = obj.data[0].uv;
                var dew = obj.data[0].dewpt;
                var vis = obj.data[0].vis;
                document.getElementById("locTemp").innerHTML = temp+`<sup>°C</sup>`;
                document.getElementById("curTemp").innerHTML = temp+`<sup>°C</sup>`;
                document.getElementById("locDesc").innerHTML = desc;
                document.getElementById("curDesc").innerHTML = desc;
                document.getElementById("locAppTemp").innerHTML = "Feels Like : " + appTemp + "°C";
                document.getElementById("locPrec").innerHTML = "Precipitation : " + String(prec).slice(0,4) + " mm";
                document.getElementById("curPrec").innerHTML = String(prec).slice(0,4) + " mm";
                document.getElementById("curHumid").innerHTML = humid + "%";
                document.getElementById("curCloud").innerHTML = clouds + "%";
                document.getElementById("curWind").innerHTML = String(wind).slice(0,5) + " m/s";
                document.getElementById("curPress").innerHTML = pres + " mb";
                document.getElementById("curAppTemp").innerHTML = appTemp + "°C";
                document.getElementById("curSnow").innerHTML = snow + " mm/hr";
                document.getElementById("curUv").innerHTML = String(uv).slice(0,5) + " (0-11+)";
                document.getElementById("curDew").innerHTML = dew + "°C";
                document.getElementById("curVis").innerHTML = String(vis).slice(0,5) + " KM";

                //Assigning Weather Icon and Current Weather Background
                var weatherCode = obj.data[0].weather.code;
                var weatherIcon = document.getElementById("curWeatherIcon");
                var curWeatherBg = document.getElementById("current");
                if(weatherCode == 300||weatherCode == 301||weatherCode == 500||weatherCode == 501||weatherCode == 511||weatherCode == 520||weatherCode == 521||weatherCode == 623) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/007-rain.png");
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/lightRain.jpg)");
                }
                else if(weatherCode == 302||weatherCode ==502||weatherCode == 522) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/008-heavy rain.png");
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/heavyRain.jpg)");
                }
                else if(weatherCode == 230||weatherCode == 231||weatherCode == 232) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/006-thunderstorm.png");
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/thunderstorm.jpg)");
                }
                else if(weatherCode == 200||weatherCode == 201||weatherCode == 202||weatherCode == 233) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/009-storm.png");
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/thunderWithRain.jpg)");
                }
                else if(weatherCode == 804||weatherCode == 900) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/001-cloudy.png");   
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/veryCloudy.jpg)");   
                }
                else if(weatherCode == 700||weatherCode == 711||weatherCode == 721||weatherCode == 741||weatherCode == 751||weatherCode == 731) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/022-fog.png"); 
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/fog.jpg)");          
                }
                else if(weatherCode == 800||weatherCode == 801) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/033-moon.png");
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/sunny.jpg)");
                }
                else if(weatherCode == 802||weatherCode == 803) {
                    weatherIcon.setAttribute("src", "img/weatherIcons/015-wind.png");
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/lightlyCloudy.jpg)");
                }
                else {
                    weatherIcon.setAttribute("src", "img/weatherIcons/011-snow.png");
                    curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/snow.jpg)");   
                }
            })
            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${currentLatitude}&lon=${currentLongitude}&key=7a633a1c626a40e7a9b329eeee978b0e`)
            .then((response) => {
                return response.json();
            }).then((obj) => {
                console.log(obj);
                var i = 1;
                while(i<13) {
                    var forecastBox = document.getElementById(`box-${i}`);

                    var dateWrapper = forecastBox.children[0];
                    var forecastDate = obj.data[i].datetime;
                    dateWrapper.innerHTML = forecastDate;

                    var forWeatherCode = obj.data[i].weather.code;
                    var forWeatherIcon = forecastBox.children[1]; 
                    if(forWeatherCode == 300||forWeatherCode == 301||forWeatherCode == 500||forWeatherCode == 501||forWeatherCode == 511||forWeatherCode == 520||forWeatherCode == 521||forWeatherCode == 623) {
                        forWeatherIcon.setAttribute("src", "img/WeatherIcons/007-rain.png");
                        
                    }
                    else if(forWeatherCode == 302||forWeatherCode ==502||forWeatherCode == 522) {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/008-heavy rain.png");
                        
                    }
                    else if(forWeatherCode == 230||forWeatherCode == 231||forWeatherCode == 232) {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/006-thunderstorm.png");
                        
                    }
                    else if(forWeatherCode == 200||forWeatherCode == 201||forWeatherCode == 202||forWeatherCode == 233) {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/009-storm.png");
                        
                    }
                    else if(forWeatherCode == 804||forWeatherCode == 900) {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/001-cloudy.png");   
                        
                    }
                    else if(forWeatherCode == 700||forWeatherCode == 711||forWeatherCode == 721||forWeatherCode == 741||forWeatherCode == 751||forWeatherCode == 731) {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/022-fog.png"); 
                        
                    }
                    else if(forWeatherCode == 800||forWeatherCode == 801) {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/033-moon.png");
                        
                    }
                    else if(forWeatherCode == 802||forWeatherCode == 803) {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/015-wind.png");
                        
                    }
                    else {
                        forWeatherIcon.setAttribute("src", "img/weatherIcons/011-snow.png");
                        
                    }

                    var forWeatherDesc = forecastBox.children[2];
                    var forMinTempWrapper = forecastBox.children[3];
                    var forMaxTempWrapper = forecastBox.children[4];
                    var forHumidWrapper = forecastBox.children[5];
                    var forPrecWrapper = forecastBox.children[6];
                    var forWindWrapper = forecastBox.children[7];
                    var forCloudsWrapper = forecastBox.children[8];

                    var forecastDesc = obj.data[i].weather.description;
                    var forecastMinTemp = obj.data[i].min_temp;
                    var forecastMaxTemp = obj.data[i].max_temp;
                    var forecastHumid = obj.data[i].rh;
                    var forecastPrec = obj.data[i].precip;
                    var forecastWind = obj.data[i].wind_spd;
                    var forecastClouds = obj.data[i].clouds;

                    forWeatherDesc.innerHTML = forecastDesc;
                    if(String(forecastDesc) == "Overcast clouds") {
                        forWeatherDesc.innerHTML = `Overcast<br>clouds`
                    }
                    if(String(forecastDesc) == "Scattered clouds") {
                        forWeatherDesc.innerHTML = `Scattered<br>clouds`
                    }
                    forMinTempWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/019-temperature.png" alt="Humidity Icon"> Min Temp : ${forecastMinTemp}°C`;
                    forMaxTempWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/020-hot.png" alt="Humidity Icon"> Max Temp : ${forecastMaxTemp}°C`;
                    forHumidWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/032-humidity.png" alt="Humidity Icon"> Humidity : ${forecastHumid} %`;
                    forPrecWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/007-rain.png" alt="Humidity Icon"> Precip : ${String(forecastPrec).slice(0,4)} mm`;
                    forWindWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/013-wind.png" alt="Humidity Icon"> Wind : ${String(forecastWind).slice(0,5)} m/s`;
                    forCloudsWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/001-cloudy.png" alt="Humidity Icon"> Cloud Cover : ${forecastClouds}%`;

                    i++;
                }
            })
        }, function() {
            alert("Location Not Accessible!");
            document.getElementById("locCityName").innerHTML = "Unable to get<br>Location";
            document.getElementById("locTemp").innerHTML = "N/A";
            document.getElementById("curCityName").innerHTML = "(No Location Given)";
            document.getElementById("curTemp").innerHTML = "N/A";
            document.getElementById("forCityName").innerHTML = "(No Location Given)";
            document.getElementById("hisStateName").innerHTML = "(No Location Given)";
        });
    }
    else {
        alert("Location not accessible!");
    }
}

function locSearch() {
    document.getElementById("hisWrapper").setAttribute("style", "display: none");
    var locationInput = document.getElementById("locationValue");
    var location = locationInput.value;
    console.log("Input : " + location);
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=e95f1b39fa474af9bd4d6e2d9a458eb8`)
    .then((response) => {
        return response.json();
    }).then((obj) => {
        var countryName = obj.results[0].components.country;
        var stateName = obj.results[0].components.state;
        var cityName = obj.results[0].components.city;
        if(String(cityName) == "undefined"){
            cityName = obj.results[0].components.county;
            if(String(cityName) == "undefined"){
                cityName = location;
            }
        }
        var timeZoneRegion = obj.results[0].annotations.timezone.name;
        var timeLag = obj.results[0].annotations.timezone.offset_string;
        var timeZone = obj.results[0].annotations.timezone.short_name;
        var placeLatitude = obj.results[0].geometry.lat;
        var placeLongitude = obj.results[0].geometry.lng;
        window.lat = placeLatitude;
        window.lng = placeLongitude;
        console.log("Input Place latitude : " + placeLatitude);
        console.log("Input Place longitude : " + placeLongitude);
        console.log(`Place : ${cityName}, ${stateName}, ${countryName}`);
        locationInput.value = `${cityName}, ${stateName}, ${countryName}`;
        document.getElementById("curCoords").innerHTML = `(Lat : ${String(placeLatitude).slice(0,6)}, Lng  : ${String(placeLongitude).slice(0,6)})`;
        document.getElementById("forCoords").innerHTML = `(Lat : ${String(placeLatitude).slice(0,6)}, Lng  : ${String(placeLongitude).slice(0,6)})`;
        document.getElementById("hisCoords").innerHTML = `(Lat : ${String(placeLatitude).slice(0,6)}, Lng  : ${String(placeLongitude).slice(0,6)})`;
        document.getElementById("curCityName").innerHTML = cityName;
        document.getElementById("curStateName").innerHTML = stateName + ", " + countryName;
        document.getElementById("forCityName").innerHTML = cityName;
        document.getElementById("forStateName").innerHTML = stateName + ", " + countryName;
        document.getElementById("hisCityName").innerHTML = cityName;
        document.getElementById("hisStateName").innerHTML = stateName + ", " + countryName;
        document.getElementById("hisTimezone").innerHTML = timeZone;
        document.getElementById("hisTimeRegion").innerHTML = timeZoneRegion;
        document.getElementById("hisTime").innerHTML = timeLag;
        fetch(`https://api.weatherbit.io/v2.0/current/daily?&lat=${placeLatitude}&lon=${placeLongitude}&key=7a633a1c626a40e7a9b329eeee978b0e`)
        .then((response) => {
            return response.json();
        }).then((obj) => {
            console.log(obj);
            //Assigning Current Weather and Intro page data
            var temp = obj.data[0].temp;
            var desc = obj.data[0].weather.description;
            var appTemp = obj.data[0].app_temp;
            var prec = obj.data[0].precip;
            var humid = obj.data[0].rh;
            var clouds = obj.data[0].clouds;
            var wind = obj.data[0].wind_spd;
            var pres = obj.data[0].pres;
            var snow = obj.data[0].snow;
            var uv = obj.data[0].uv;
            var dew = obj.data[0].dewpt;
            var vis = obj.data[0].vis;
    
            document.getElementById("curTemp").innerHTML = temp+`<sup>°C</sup>`;
            
            document.getElementById("curDesc").innerHTML = desc;
            
            document.getElementById("locPrec").innerHTML = "Precipitation : " + String(prec).slice(0,4) + " mm";
            document.getElementById("curPrec").innerHTML = String(prec).slice(0,4) + " mm";
            document.getElementById("curHumid").innerHTML = humid + "%";
            document.getElementById("curCloud").innerHTML = clouds + "%";
            document.getElementById("curWind").innerHTML = String(wind).slice(0,5) + " m/s";
            document.getElementById("curPress").innerHTML = pres + " mb";
            document.getElementById("curAppTemp").innerHTML = appTemp + "°C";
            document.getElementById("curSnow").innerHTML = snow + " mm/hr";
            document.getElementById("curUv").innerHTML = String(uv).slice(0,5) + " (0-11+)";
            document.getElementById("curDew").innerHTML = dew + "°C";
            document.getElementById("curVis").innerHTML = String(vis).slice(0,5) + " KM";

            //Assigning Weather Icon and Current Weather Background
            var weatherCode = obj.data[0].weather.code;
            var weatherIcon = document.getElementById("curWeatherIcon");
            var curWeatherBg = document.getElementById("current");
            if(weatherCode == 300||weatherCode == 301||weatherCode == 500||weatherCode == 501||weatherCode == 511||weatherCode == 520||weatherCode == 521||weatherCode == 623) {
                weatherIcon.setAttribute("src", "img/weatherIcons/007-rain.png");
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/lightRain.jpg)");
            }
            else if(weatherCode == 302||weatherCode ==502||weatherCode == 522) {
                weatherIcon.setAttribute("src", "img/weatherIcons/008-heavy rain.png");
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/heavyRain.jpg)");
            }
            else if(weatherCode == 230||weatherCode == 231||weatherCode == 232) {
                weatherIcon.setAttribute("src", "img/weatherIcons/006-thunderstorm.png");
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/thunderstorm.jpg)");
            }
            else if(weatherCode == 200||weatherCode == 201||weatherCode == 202||weatherCode == 233) {
                weatherIcon.setAttribute("src", "img/weatherIcons/009-storm.png");
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/thunderWithRain.jpg)");
            }
            else if(weatherCode == 804||weatherCode == 900) {
                weatherIcon.setAttribute("src", "img/weatherIcons/001-cloudy.png");   
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/veryCloudy.jpg)");   
            }
            else if(weatherCode == 700||weatherCode == 711||weatherCode == 721||weatherCode == 741||weatherCode == 751||weatherCode == 731) {
                weatherIcon.setAttribute("src", "img/weatherIcons/022-fog.png"); 
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/fog.jpg)");          
            }
            else if(weatherCode == 800||weatherCode == 801) {
                weatherIcon.setAttribute("src", "img/weatherIcons/033-moon.png");
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/sunny.jpg)");
            }
            else if(weatherCode == 802||weatherCode == 803) {
                weatherIcon.setAttribute("src", "img/weatherIcons/015-wind.png");
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/lightlyCloudy.jpg)");
            }
            else {
                weatherIcon.setAttribute("src", "img/weatherIcons/011-snow.png");
                curWeatherBg.setAttribute("style", "background-image: url(img/weatherBackgrounds/snow.jpg)");   
            }
        })
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${placeLatitude}&lon=${placeLongitude}&key=7a633a1c626a40e7a9b329eeee978b0e`)
        .then((response) => {
            return response.json();
        }).then((obj) => {
            console.log(obj);
            var i = 1;
            while(i<13) {
                var forecastBox = document.getElementById(`box-${i}`);

                var dateWrapper = forecastBox.children[0];
                var forecastDate = obj.data[i].datetime;
                dateWrapper.innerHTML = forecastDate;

                var forWeatherCode = obj.data[i].weather.code;
                var forWeatherIcon = forecastBox.children[1]; 
                if(forWeatherCode == 300||forWeatherCode == 301||forWeatherCode == 500||forWeatherCode == 501||forWeatherCode == 511||forWeatherCode == 520||forWeatherCode == 521||forWeatherCode == 623) {
                    forWeatherIcon.setAttribute("src", "img/WeatherIcons/007-rain.png");
                    
                }
                else if(forWeatherCode == 302||forWeatherCode ==502||forWeatherCode == 522) {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/008-heavy rain.png");
                    
                }
                else if(forWeatherCode == 230||forWeatherCode == 231||forWeatherCode == 232) {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/006-thunderstorm.png");
                    
                }
                else if(forWeatherCode == 200||forWeatherCode == 201||forWeatherCode == 202||forWeatherCode == 233) {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/009-storm.png");
                    
                }
                else if(forWeatherCode == 804||forWeatherCode == 900) {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/001-cloudy.png");   
                    
                }
                else if(forWeatherCode == 700||forWeatherCode == 711||forWeatherCode == 721||forWeatherCode == 741||forWeatherCode == 751||forWeatherCode == 731) {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/022-fog.png"); 
                    
                }
                else if(forWeatherCode == 800||forWeatherCode == 801) {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/033-moon.png");
                    
                }
                else if(forWeatherCode == 802||forWeatherCode == 803) {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/015-wind.png");
                    
                }
                else {
                    forWeatherIcon.setAttribute("src", "img/weatherIcons/011-snow.png");
                    
                }

                var forWeatherDesc = forecastBox.children[2];
                var forMinTempWrapper = forecastBox.children[3];
                var forMaxTempWrapper = forecastBox.children[4];
                var forHumidWrapper = forecastBox.children[5];
                var forPrecWrapper = forecastBox.children[6];
                var forWindWrapper = forecastBox.children[7];
                var forCloudsWrapper = forecastBox.children[8];

                var forecastDesc = obj.data[i].weather.description;
                var forecastMinTemp = obj.data[i].min_temp;
                var forecastMaxTemp = obj.data[i].max_temp;
                var forecastHumid = obj.data[i].rh;
                var forecastPrec = obj.data[i].precip;
                var forecastWind = obj.data[i].wind_spd;
                var forecastClouds = obj.data[i].clouds;

                forWeatherDesc.innerHTML = forecastDesc;
                if(String(forecastDesc) == "Overcast clouds") {
                    forWeatherDesc.innerHTML = `Overcast<br>clouds`
                }
                if(String(forecastDesc) == "Scattered clouds") {
                    forWeatherDesc.innerHTML = `Scattered<br>clouds`
                }
                forMinTempWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/019-temperature.png" alt="Humidity Icon"> Min Temp : ${forecastMinTemp}°C`;
                forMaxTempWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/020-hot.png" alt="Humidity Icon"> Max Temp : ${forecastMaxTemp}°C`;
                forHumidWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/032-humidity.png" alt="Humidity Icon"> Humidity : ${forecastHumid} %`;
                forPrecWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/007-rain.png" alt="Humidity Icon"> Precip : ${String(forecastPrec).slice(0,4)} mm`;
                forWindWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/013-wind.png" alt="Humidity Icon"> Wind : ${String(forecastWind).slice(0,5)} m/s`;
                forCloudsWrapper.innerHTML = `<img class="forPropWeatherIcon" src="img/weatherIcons/001-cloudy.png" alt="Humidity Icon"> Cloud Cover : ${forecastClouds}%`;

                i++;
            }
        })
    })
    document.getElementById('current').scrollIntoView({
        behavior: 'smooth'
    });
}

function dateSearch() {
    var forecastDateInput = document.getElementById("forecastDate");
    window.forecastStartDate = new Date(forecastDateInput.value);
    window.forecastEndDate = new Date(forecastDateInput.value);
    window.forecastEndDate.setDate(window.forecastStartDate.getDate()+1);
    function formatDate(date) { 
        var day = date.getDate(); 
        if (day < 10) { 
            day = "0" + day; 
        } 
        var month = date.getMonth() + 1; 
        if (month < 10) { 
            month = "0" + month; 
        } 
        var year = date.getFullYear();
        return year + "-" + month + "-" + day; 
    }
    window.forecastStartDate = formatDate(window.forecastStartDate);
    window.forecastEndDate = formatDate(window.forecastEndDate);
    fetch(`https://api.weatherbit.io/v2.0/history/daily?&lat=${window.lat}&lon=${window.lng}&start_date=${window.forecastStartDate}&end_date=${window.forecastEndDate}&key=7a633a1c626a40e7a9b329eeee978b0e`)
    .then((response) => {
        return response.json();
    }).then((obj) => {
        console.log(obj);

        var temp = obj.data[0].temp;
        var appTemp = obj.data[0].max_temp;
        var prec = obj.data[0].precip;
        var humid = obj.data[0].rh;
        var clouds = obj.data[0].clouds;
        var wind = obj.data[0].wind_spd;
        var pres = obj.data[0].pres;
        var snow = obj.data[0].snow;
        var uv = obj.data[0].max_uv;
        var dew = obj.data[0].dewpt;
        var windDir = obj.data[0].wind_dir;

        document.getElementById("hisTemp").innerHTML = temp + "°C";
        document.getElementById("hisPrec").innerHTML = String(prec).slice(0,4) + " mm";
        document.getElementById("hisHumid").innerHTML = humid + "%";
        document.getElementById("hisCloud").innerHTML = clouds + "%";
        document.getElementById("hisWind").innerHTML = String(wind).slice(0,5) + " m/s";
        document.getElementById("hisPress").innerHTML = pres + " mb";
        document.getElementById("hisAppTemp").innerHTML = appTemp + "°C";
        document.getElementById("hisSnow").innerHTML = snow + " mm/hr";
        document.getElementById("hisUv").innerHTML = String(uv).slice(0,5) + " (0-11+)";
        document.getElementById("hisDew").innerHTML = dew + "°C";
        document.getElementById("hisWindDir").innerHTML = String(windDir).slice(0,5) + "°";

        document.getElementById("hisWrapper").setAttribute("style", "");
    })
}

var curRow = 2;
function forecastExpand() {
    var forecastRow2 = document.getElementById("forecast-row2");
    var forecastRow3 = document.getElementById("forecast-row3");
    var navButton = document.getElementById("navButton");
    if(Number(curRow) == 2) {
        forecastRow2.setAttribute("style", "");
        curRow = 3;
    }
    else if(Number(curRow) == 3) {
        forecastRow3.setAttribute("style", "");
        navButton.setAttribute("style", "display: none");
    }
}

var input = document.getElementById("locationValue");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("locSearchButton").click();
  }
});