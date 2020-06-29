
    function weather_report(){
        var key1 = '2e6397ec3e2f8ec09062bfb386aa6e59';
        var loc = document.getElementById('weather_location').value;
        fetch('http://api.positionstack.com/v1/forward?access_key='+key1+'&query='+loc)
        .then(function(resp1) { return resp1.json() }) // Convert data to json
        .then(function(data1) {
            var location = data1['data'][0];
            var key2 = '21768454932c4ed0f606fcf15bc86604';
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
                document.getElementById('location').innerHTML = "<center>LOCATION :</center>";
                var longitude = parseFloat(location["longitude"]);
	              var latitude = parseFloat(location["latitude"]); 	
      	        document.getElementById('longitude').innerHTML = "<center>The Longitude of the location : &nbsp&nbsp"+longitude+"°E</center>";
	              document.getElementById('latitude').innerHTML = "<center>The Latitude of the location : &nbsp&nbsp&nbsp&nbsp&nbsp"+latitude+"°N</center>";
                
                //Initializers
                var response = data3;
                var curdate = parseInt(data3['daily'][0]['dt']);

                //Weather Forecast
                document.getElementById('weather').innerHTML = "<center>WEATHER&nbsp&nbsp&nbspREPORT :</center>";
                //day3 -- Current Date
                document.getElementById('day3').innerHTML = "<center><i>&ltToday's Weather&gt</i></center>";
                document.getElementById('temp_feel3').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['current']['temp']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['current']['feels_like']+"°C</center>";
                document.getElementById('max_min_temp3').innerHTML = "<center><b>Min Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['temp']['min']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Max Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['temp']['max']+"°C</center>";
                document.getElementById('weather_conditions3').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['weather'][0]['main']+" - "+response['daily'][0]['weather'][0]['description']+"</center>";
                document.getElementById('wind_humid3').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][0]['humidity']+"%</center>";

                //day4 -- Tomorrow
                document.getElementById('day4').innerHTML = "<center><i>&ltTomorrow's Forecast&gt</i></center>";
                document.getElementById('temp_feel4').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['temp']['day']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['feels_like']['day']+"°C</center>";
                document.getElementById('max_min_temp4').innerHTML = "<center><b>Min Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['temp']['min']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Max Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['temp']['max']+"°C</center>";
                document.getElementById('weather_conditions4').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['weather'][0]['main']+" - "+response['daily'][1]['weather'][0]['description']+"</center>";
                document.getElementById('wind_humid4').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][1]['humidity']+"%</center>";
                
                //day5 -- Day After Tomorrow
                document.getElementById('day5').innerHTML = "<center><i>&ltDay After Tomorrow's Forecast&gt</i></center>";
                document.getElementById('temp_feel5').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['temp']['day']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['feels_like']['day']+"°C</center>";
                document.getElementById('max_min_temp5').innerHTML = "<center><b>Min Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['temp']['min']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Max Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['temp']['max']+"°C</center>";
                document.getElementById('weather_conditions5').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['weather'][0]['main']+" - "+response['daily'][2]['weather'][0]['description']+"</center>";
                document.getElementById('wind_humid5').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response['daily'][2]['humidity']+"%</center>";
                
                //day1 -- Day Before Yesterday
                var date_bfr_ystd = curdate - (2*60*60*24);
                fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+location["latitude"]+'&lon='+location["longitude"]+'&dt='+date_bfr_ystd+'&units=metric&appid='+key2)
                .then(function(resp4) { return resp4.json() }) // Convert data to json
                .then(function(data4) {
                  var response2 = data4;
                  document.getElementById('day1').innerHTML = "<center><i>&ltDay Before Yesterday's Weather&gt</i></center>";
                  document.getElementById('temp_feel1').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['temp']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['feels_like']+"°C</center>";
                  document.getElementById('weather_conditions1').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['weather'][0]['main']+" - "+response2['current']['weather'][0]['description']+"</center>";
                  document.getElementById('wind_humid1').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response2['current']['humidity']+"%</center>";
                })
                .catch(function() {
                  alert("An Error Occured!");     //Catch any errors
                });
                
                //day2 -- Yesterday
                var date_ystd = curdate - (60*60*24);
                fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+location["latitude"]+'&lon='+location["longitude"]+'&dt='+date_ystd+'&units=metric&appid='+key2)
                .then(function(resp5) { return resp5.json() }) // Convert data to json
                .then(function(data5) {
                  var response3 = data5;
                  document.getElementById('day2').innerHTML = "<center><i>&ltYesterday's Weather&gt</i></center>";
                  document.getElementById('temp_feel2').innerHTML = "<center><b>Temp :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['temp']+"°C &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Feels Like :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['feels_like']+"°C</center>";
                  document.getElementById('weather_conditions2').innerHTML = "<center><b>Weather Conditions :</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['weather'][0]['main']+" - "+response3['current']['weather'][0]['description']+"</center>";
                  document.getElementById('wind_humid2').innerHTML = "<center><b>Wind Speed :</b> &nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['wind_speed']+" kmph &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"<b>Humidity :</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+response3['current']['humidity']+"%</center>";
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