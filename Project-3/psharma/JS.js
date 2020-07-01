          var input= document.querySelector(".in");
            console.log(input.value);
            var output= document.querySelector("output");
            var mycity;
            var pre=document.querySelector("pre");



        if(navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(function (position){
                    input.placeholder='Waiting for your Location.........';
                console.log(position);
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=02c4823dfae54330b4abe7bd16ab0e28`)
                .then(function(resp){
                    return resp.json();
                }).then(function(d){
                    mycity = d.results[0].components.city;
                    console.log(mycity);
                   
                    // pre=`<h1>Weather of your current location</h1>`;
                    
                    input.value=mycity;
                    // document.getElementById("pre").innerHTML = pre;
                    gettext();
                    // setTimeout(function(){
                    //     pre=null;
                    // document.getElementById("pre").innerHTML = pre;
                    // },5000);
                });

               });
                
                
           
            
            }
        else
        {
        console.log("location not available");
        output='!!!Current Location not found!!! ';
        document.getElementById("output").innerHTML = output;
        }
        
           
            document.getElementById('submit').addEventListener('click',gettext);
           function gettext(){ 
            
               fetch("https://api.openweathermap.org/data/2.5/forecast?q="+input.value+"&appid=3e877efbfd7a5cbeccca854ae6814bed")
               .then(function(res){
                   return res.json();
               }).then(function(data){
                  console.log(data) ;
                  var icon1=data.list[0].weather[0].icon;
                  var icon2=data.list[8].weather[0].icon;
                  var icon3=data.list[16].weather[0].icon;
                  input.value = null;
                  input.placeholder=`${data.city.name},${data.city.country}{Lat:${data.city.coord.lat},Long:${data.city.coord.lon} }`;
                  output ='';
                  output+=`
                  <div class="box1">
                  <h2>&nbsp &nbsp&nbsp &nbsp&nbsp &nbspToday</h2>
                  <ul> 
                    <img src=" http://openweathermap.org/img/wn/${icon1}@2x.png">
                    <div class="fl"> ${(data.list[0].main.temp-273.15).toPrecision(4)} &deg C</div>
                    <li> Weather :${data.list[0].weather[0].description} </li>
                    <li>Humidity : ${data.list[0].main.humidity} %</li>
                    <li>Wind : ${(data.list[0].wind.speed*1.609).toPrecision(2)} km/hr</li>
                    
                    </ul>
                    </div>
                    <div class="box2">
                    <h2>&nbsp &nbsp&nbsp &nbsp&nbsp &nbspTomorrow</h2>
                        <ul> 
                    <img src=" http://openweathermap.org/img/wn/${icon2}@2x.png">
                    <div class="fl"> ${(data.list[8].main.temp-273.15).toPrecision(4)} &deg C</div>
                    <li> Weather :${data.list[8].weather[0].description} </li> 
                    <li>Humidity : ${data.list[8].main.humidity} %</li>
                    <li>Wind : ${(data.list[8].wind.speed*1.609).toPrecision(2)} km/hr</li>
                    
                    </ul>

                    </div>

                
                    <div class="box3">
                    <h2>&nbsp &nbsp&nbsp &nbsp&nbsp &nbspDay After</h2>
                        <ul> 
                    <img src=" http://openweathermap.org/img/wn/${icon3}@2x.png">
                    <div class="fl"> ${(data.list[16].main.temp-273.15).toPrecision(4)} &deg C</div>
                    <li> Weather :${data.list[16].weather[0].description} </li> 
                    <li>Humidity : ${data.list[16].main.humidity} %</li>
                    <li>Wind : ${(data.list[16].wind.speed*1.609).toPrecision(2)} km/hr</li>
                    
                    </ul>

                    </div>
                    
                    `
                    ;
                    document.getElementById("output").innerHTML = output;
               }).catch((err)=>{
                   output='!!!Error!!! City not in database';
                   document.getElementById("output").innerHTML = output;
               });
        
           }
        //    var preload= document.getElementById('preloader');

        //    function vanish(){
        //               preload.style.display="none";
                                // }
        //    document.getElementsByClassName(".in").innerHTML = input;
        