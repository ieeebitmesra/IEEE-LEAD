
    function weather_report(){
        let key1 = '2e6397ec3e2f8ec09062bfb386aa6e59';
        let loc = document.getElementById('weather_location').value;
        fetch('http://api.positionstack.com/v1/forward?access_key='+key1+'&query='+loc)
        .then(function(resp1) { return resp1.json() }) // Convert data to json
        .then(function(data1) {
            let location = data1['data'][0];
            let key2 = '21768454932c4ed0f606fcf15bc86604';
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+location["latitude"]+'&lon='+location["longitude"]+'&units=metric&appid='+key2)
            .then(function(resp3) { return resp3.json() }) // Convert data to json
            .then(function(data3) {
                fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+location["latitude"]+'&lon='+location["longitude"]+'&units=metric&appid='+key2)
                .then(function(resp2) { return resp2.json() }) // Convert data to json
                .then(function(data2) {
                  alert(
                    "\nToday's Weather"+
                    "\nDate and Time :              "+data2['list'][0]['dt_txt']+
                    "\nCurrent Temperature :    "+data2['list'][0]['main']['temp']+"°C"+
                    "\nWeather Conditions :     "+data2['list'][0]['weather'][0]['main']+" - "+data2['list'][0]['weather'][0]['description']+
                    "\nWind Speed :                 "+data2['list'][0]['wind']['speed']+" kmph"
                  );
                })
                .catch(function() {
                  alert("An Error Occured!");     //Catch any errors
                });

                //Location
                document.getElementById('weather_location').value = location['name']+", "+location['region']+", "+location['country'];
                document.getElementById('location').innerHTML = "<center>LOCATION :</center>";
                let longitude = parseFloat(location["longitude"]);
	              let latitude = parseFloat(location["latitude"]); 	
      	        document.getElementById('longitude').innerHTML = "<center>The Longitude of the location : &nbsp&nbsp"+longitude+"°E</center>";
	              document.getElementById('latitude').innerHTML = "<center>The Latitude of the location : &nbsp&nbsp&nbsp&nbsp&nbsp"+latitude+"°N</center>";
                
                //Initializers
                let response = data3;
                let curdate = parseInt(data3['daily'][0]['dt']);
                let weather_background;

                //Weather Forecast
                document.getElementById('weather').innerHTML = "<center>WEATHER&nbsp&nbsp&nbspREPORT :</center>";
                //day3 -- Current Date
                document.getElementById('day3').innerHTML = "<center><i>&ltToday's Weather&gt</i></center>";
                document.getElementById('temp_feel3').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['current']['temp']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['current']['feels_like']+"°C</center>";
                document.getElementById('max_min_temp3').innerHTML = "<center><b>Min Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['temp']['min']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Max Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['temp']['max']+"°C</center>";
                document.getElementById('weather_conditions3').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['weather'][0]['main']+" - "+response['daily'][0]['weather'][0]['description']+"</center>";
                document.getElementById('wind_humid3').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['humidity']+"%</center>";
                document.getElementById('today').style.backgroundImage = "url(weather_back/Clear.jpg)";
                  weather_background = response['daily'][0]['weather'][0]['main'];
                  if(weather_background === "Smoke" || weather_background === "Sand" || weather_background === "Dust"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Smoke.jpg)";
                  }
                  else if(weather_background === "Fog" || weather_background === "Smoke"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Fog.jpg)";
                  }
                  else if(weather_background === "Rain"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Rain.jpg)";
                  }
                  else if(weather_background === "Drizzle"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Drizzle.jpg)";
                  }
                  else if(weather_background === "Clouds"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Clouds.jpg)";
                  }
                  else if(weather_background === "Thunderstorm"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Thunderstorm.jpg)";
                  }
                  else if(weather_background === "Tornado"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Tornado.jpg)";
                  }
                  else if(weather_background === "Snow"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Snow.jpg)";
                  }
                  else if(weather_background === "Haze"){
                    document.getElementById('today').style.backgroundImage = "url(weather_back/Haze.jpg)";
                  }

                //day4 -- Tomorrow
                document.getElementById('day4').innerHTML = "<center><i>&ltTomorrow's Forecast&gt</i></center>";
                document.getElementById('temp_feel4').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['temp']['day']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['feels_like']['day']+"°C</center>";
                document.getElementById('max_min_temp4').innerHTML = "<center><b>Min Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['temp']['min']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Max Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['temp']['max']+"°C</center>";
                document.getElementById('weather_conditions4').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['weather'][0]['main']+" - "+response['daily'][1]['weather'][0]['description']+"</center>";
                document.getElementById('wind_humid4').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['humidity']+"%</center>";
                document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Clear.jpg)";
                weather_background = response['daily'][1]['weather'][0]['main'];
                if(weather_background === "Smoke" || weather_background === "Sand" || weather_background === "Dust"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Smoke.jpg)";
                }
                else if(weather_background === "Fog" || weather_background === "Smoke"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Fog.jpg)";
                }
                else if(weather_background === "Rain"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Rain.jpg)";
                }
                else if(weather_background === "Drizzle"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Drizzle.jpg)";
                }
                else if(weather_background === "Clouds"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Clouds.jpg)";
                }
                else if(weather_background === "Thunderstorm"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Thunderstorm.jpg)";
                }
                else if(weather_background === "Tornado"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Tornado.jpg)";
                }
                else if(weather_background === "Snow"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Snow.jpg)";
                }
                else if(weather_background === "Haze"){
                  document.getElementById('tomorrow').style.backgroundImage = "url(weather_back/Haze.jpg)";
                }
                
                //day5 -- Day After Tomorrow
                document.getElementById('day5').innerHTML = "<center><i>&ltDay After Tomorrow's Forecast&gt</i></center>";
                document.getElementById('temp_feel5').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['temp']['day']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['feels_like']['day']+"°C</center>";
                document.getElementById('max_min_temp5').innerHTML = "<center><b>Min Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['temp']['min']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Max Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['temp']['max']+"°C</center>";
                document.getElementById('weather_conditions5').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['weather'][0]['main']+" - "+response['daily'][2]['weather'][0]['description']+"</center>";
                document.getElementById('wind_humid5').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['humidity']+"%</center>";
                document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Clear.jpg)";
                weather_background = response['daily'][2]['weather'][0]['main'];
                console.log(weather_background);
                if(weather_background === "Smoke" || weather_background === "Sand" || weather_background === "Dust"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Smoke.jpg)";
                }
                else if(weather_background === "Fog" || weather_background === "Smoke"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Fog.jpg)";
                }
                else if(weather_background === "Rain"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Rain.jpg)";
                }
                else if(weather_background === "Drizzle"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Drizzle.jpg)";
                }
                else if(weather_background === "Clouds"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Clouds.jpg)";
                }
                else if(weather_background === "Thunderstorm"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Thunderstorm.jpg)";
                }
                else if(weather_background === "Tornado"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Tornado.jpg)";
                }
                else if(weather_background === "Snow"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Snow.jpg)";
                }
                else if(weather_background === "Haze"){
                  document.getElementById('day_after_tomorrow').style.backgroundImage = "url(weather_back/Haze.jpg)";
                }
                
                //day1 -- Day Before Yesterday
                let date_bfr_ystd = curdate - (2*60*60*24);
                fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+location["latitude"]+'&lon='+location["longitude"]+'&dt='+date_bfr_ystd+'&units=metric&appid='+key2)
                .then(function(resp4) { return resp4.json() }) // Convert data to json
                .then(function(data4) {
                  let response2 = data4;
                  document.getElementById('day1').innerHTML = "<center><i>&ltDay Before Yesterday's Weather&gt</i></center>";
                  document.getElementById('temp_feel1').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['temp']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['feels_like']+"°C</center>";
                  document.getElementById('weather_conditions1').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['weather'][0]['main']+" - "+response2['current']['weather'][0]['description']+"</center>";
                  document.getElementById('wind_humid1').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['humidity']+"%</center>";
                  document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Clear.jpg)";
                  weather_background = response2['current']['weather'][0]['main'];
                  if(weather_background === "Smoke" || weather_background === "Sand" || weather_background === "Dust"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Smoke.jpg)";
                  }
                  else if(weather_background === "Fog" || weather_background === "Smoke"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Fog.jpg)";
                  }
                  else if(weather_background === "Rain"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Rain.jpg)";
                  }
                  else if(weather_background === "Drizzle"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Drizzle.jpg)";
                  }
                  else if(weather_background === "Clouds"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Clouds.jpg)";
                  }
                  else if(weather_background === "Thunderstorm"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Thunderstorm.jpg)";
                  }
                  else if(weather_background === "Tornado"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Tornado.jpg)";
                  }
                  else if(weather_background === "Snow"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Snow.jpg)";
                  }
                  else if(weather_background === "Haze"){
                    document.getElementById('day_before_yesterday').style.backgroundImage = "url(weather_back/Haze.jpg)";
                  }
                })
                .catch(function() {
                  alert("An Error Occured!");     //Catch any errors
                });
                
                //day2 -- Yesterday
                let date_ystd = curdate - (60*60*24);
                fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+location["latitude"]+'&lon='+location["longitude"]+'&dt='+date_ystd+'&units=metric&appid='+key2)
                .then(function(resp5) { return resp5.json() }) // Convert data to json
                .then(function(data5) {
                  let response3 = data5;
                  document.getElementById('day2').innerHTML = "<center><i>&ltYesterday's Weather&gt</i></center>";
                  document.getElementById('temp_feel2').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['temp']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['feels_like']+"°C</center>";
                  document.getElementById('weather_conditions2').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['weather'][0]['main']+" - "+response3['current']['weather'][0]['description']+"</center>";
                  document.getElementById('wind_humid2').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['humidity']+"%</center>";
                  document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Clear.jpg)";
                  weather_background = response3['current']['weather'][0]['main'];
                  if(weather_background === "Smoke" || weather_background === "Sand" || weather_background === "Dust"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Smoke.jpg)";
                  }
                  else if(weather_background === "Fog" || weather_background === "Smoke"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Fog.jpg)";
                  }
                  else if(weather_background === "Rain"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Rain.jpg)";
                  }
                  else if(weather_background === "Drizzle"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Drizzle.jpg)";
                  }
                  else if(weather_background === "Clouds"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Clouds.jpg)";
                  }
                  else if(weather_background === "Thunderstorm"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Thunderstorm.jpg)";
                  }
                  else if(weather_background === "Tornado"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Tornado.jpg)";
                  }
                  else if(weather_background === "Snow"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Snow.jpg)";
                  }
                  else if(weather_background === "Haze"){
                    document.getElementById('yesterday').style.backgroundImage = "url(weather_back/Haze.jpg)";
                  }
                })
                .catch(function() {
                  alert("An Error Occured!");     //Catch any errors
                });
                

                
            })
            .catch(function() {
                alert("An Error Occured!");     //Catch any errors
            });
        })
        .catch(function() {
            alert("An Error Occured!");     //Catch any errors
        });
    }