var ele=0; 
var lt;
var lg;
var currdt;
var y=0;
var z=1;
var locationForm=document.getElementById('location-form');
locationForm.addEventListener('submit',geocode);
function geocode(e){
e.preventDefault();
var location=document.getElementById('location-input').value;
api = '9bce5794a50246e197e0132ee3b50cda';
request = 'https://api.opencagedata.com/geocode/v1/json?q='+location+'&key='+api;
axios.get(request)
.then(function(response){
console.log(response);
var p =response.data.results[0].formatted;
document.getElementById('location-input').value= p
let lati=document.getElementById('latitude');
let lngi=document.getElementById('longitude');
lt= response.data.results[0].geometry.lat;
lg= response.data.results[0].geometry.lng;
var lt1=lt.toFixed(2);
var lg1=lg.toFixed(2);
var a= "Lat - " + lt1+" / ";
var b= "Long -" + lg1;
lati.innerText = a;
lngi.innerText = b;

getWeatherReport(lt,lg);
})
.catch(function(error){
    console.log(error);
    });
} // geocode ends
function xyz() {
    if(ele<32 && ele>0)
    {
        ele=z*8;
        z=z+1;
        getWeatherReport(lt,lg);
    }
    if(ele==10)
    {
        y=y-1;
        getWeatherReport1(lt,lg);
    }
}
function abc() {
    if(z>0)
    {
        z=z-1;
        ele=z*8;
        getWeatherReport(lt,lg);
    }
    else{
        y=y+1;
        getWeatherReport1(lt,lg);
    }
}
function getWeatherReport1(lat,lng)
{
    if(y==4)
    {
        document.getElementById("myBtn1").disabled = true;
    }
    key='984f6ed8f9e27c7714d16b05206acbce';
    baseUrl='https://api.openweathermap.org/data/2.5/onecall/timemachine?';
    var dtdata=currdt-(y*86400);
    request1=baseUrl+"lat="+lat+"&lon="+lng+"&dt="+dtdata+"&appid="+key;
    fetch(request1)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport1);
}
function showWeatherReport1(weather){
    console.log(weather);
    let temperature=document.getElementById('temp');
    var t=weather.current.temp;
    var c=(Math.round(t-273.15));
    var d='&deg;C' ;
    temperature.innerHTML = c+d;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.current.weather[0].main.toUpperCase()}`;

    if(weather.current.weather[0].main=='Rain')
    {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    if(weather.current.weather[0].main=='Clear')
    {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    if(weather.current.weather[0].main=='Clouds')
    {
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
    }
    if(weather.current.weather[0].main=='Clouds')
    {
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
    }
    if(weather.current.weather[0].main=='Thunderstorm')
    {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }
    if(weather.current.weather[0].main=='Drizzle')
    {
        document.body.style.backgroundImage = "url('images/drizzle.jpg')";
    }
    if(weather.current.weather[0].main=='Snow')
    {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    let date = document.getElementById('date');
    var dx=weather.current.dt;
    date.innerText=timeConverter(dx);
    let day = document.getElementById('day');
    day.innerText= daydisplay(dx);
    let wind= document.getElementById('wind');
    var w= weather.current.wind_speed*3.6;
    w=w.toFixed(2);
    wind.innerHTML=w+ ' km/hr';
    let preci = document.getElementById('preci');
    preci.innerText = `${weather.current.humidity} %`;
    let icon= weather.current.weather[0].icon;
    document.getElementById('icon').src = "icons/" + icon + ".png";
    document.querySelector('.all').style.display="block";
    document.querySelector('.cont2').style.display="none";
}
function getWeatherReport(lat,lng){
    key='984f6ed8f9e27c7714d16b05206acbce';
    //http://samples.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=439d4b804bc8187953eb36d2a8c26a02
    baseUrl='https://api.openweathermap.org/data/2.5/forecast?';
    request1=baseUrl+"lat="+lat+"&lon="+lng+"&appid="+key;
    fetch(request1)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
function showWeatherReport(weather){
    console.log(weather);
    let place = document.getElementById('place');
    place.innerText=`${weather.city.name},${weather.city.country}`;
    let temperature=document.getElementById('temp');
    var t=weather.list[ele].main.temp;
    var c=(Math.round(t-273.15));
    var d='&deg;C' ;
    temperature.innerHTML = c+d;
    let minTemp = document.getElementById('min');
    minTemp.innerHTML=`${Math.floor(weather.list[ele].main.temp_min-273.15)}&deg;C`;
    let maxTemp = document.getElementById('max');
    maxTemp.innerHTML=`${Math.ceil(weather.list[ele].main.temp_max-273.15)}&deg;C`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.list[ele].weather[0].main.toUpperCase()}`;

    if(weather.list[ele].weather[0].main=='Rain')
    {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    if(weather.list[ele].weather[0].main=='Clear')
    {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    if(weather.list[ele].weather[0].main=='Clouds')
    {
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
    }
    if(weather.list[ele].weather[0].main=='Clouds')
    {
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
    }
    if(weather.list[ele].weather[0].main=='Thunderstorm')
    {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }
    if(weather.list[ele].weather[0].main=='Drizzle')
    {
        document.body.style.backgroundImage = "url('images/drizzle.jpg')";
    }
    if(weather.list[ele].weather[0].main=='Snow')
    {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    let date = document.getElementById('date');
    var dx=weather.list[ele].dt;
    date.innerText=timeConverter(dx);
    let day = document.getElementById('day');
    day.innerText= daydisplay(dx);
    let wind= document.getElementById('wind');
    var w= weather.list[0].wind.speed*3.6;
    w=w.toFixed(2);
    wind.innerHTML=w+ ' km/hr';
    let preci = document.getElementById('preci');
    preci.innerText = `${weather.list[ele].main.humidity} %`;
    let icon= weather.list[ele].weather[0].icon;
    document.getElementById('icon').src = "icons/" + icon + ".png";
    currdt=weather.list[0].dt;
    document.querySelector('.all').style.display="block";
    document.querySelector('.cont2').style.display="block";
    if(ele==31)
    {
        document.getElementById("myBtn").disabled = true;
    }
    ele=10;
}
function timeConverter(UNIX_timestamp)
{
    var a = new Date(UNIX_timestamp * 1000);
    let months = ["01","2","3","4","5","6","7","08","09","10","11","12"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var day=a.getDay();
    var time = date + '/' + month + '/' + year;
    return time;
}   
function daydisplay(UNIX_timestamp)
{
    var b= new Date(UNIX_timestamp * 1000);
    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var n=weekday[b.getDay()];
    n=n.toUpperCase();
    return n;
}
