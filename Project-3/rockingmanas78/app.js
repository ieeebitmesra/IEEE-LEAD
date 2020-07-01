var script = document.createElement('script');
script. scr = '//code.jquery.com/jquery-2.2.4.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var button = document.querySelector('.button')
var button2 = document.querySelector('.button2')
// var button3 = document.querySelector('.button2')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var latt = document.querySelector('.latt');
var long = document.querySelector('.long');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var date1 = document.querySelector(".date1");
var tmax1 = document.querySelector('.tmax1');
var tmin1 = document.querySelector('.tmin1');
var desc1 = document.querySelector('.desc1');
var date2 = document.querySelector(".date2");
var tmax2 = document.querySelector('.tmax2');
var tmin2 = document.querySelector('.tmin2');
var desc2 = document.querySelector('.desc2');
var date3 = document.querySelector(".date3");
var tmax3 = document.querySelector('.tmax3');
var tmin3 = document.querySelector('.tmin3');
var desc3 = document.querySelector('.desc3');
var x = document.getElementById('output');

function getLocation(){
  if(navigator.geolocation){
    
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else{
    x.innerHTML=("Browser not supporting");
  }
}

function showPosition(position){
  var lattitude = position.coords.latitude;
  
  var longitude = position.coords.longitude;
  latt.innerHTML = `Lattitude : +${lattitude}`;
  long.innerHTML = `Longitude : +${longitude}`;
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&units=metric&appid=b7da5629f1d1f7f9d57bcac93283fac2')
  .then(response => response.json())
      .then(data => {
          // console.log(data);
          
          var tempValue = data['main']['temp'];
          var descValue = data['weather'][0]['description'];
          temp.innerHTML = `Temperature : +${tempValue}° <span>C<span> `;
          desc.innerHTML = descValue;
      })

      // .catch(err => alert("Wrong city name!"))
}


button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&appid=b7da5629f1d1f7f9d57bcac93283fac2')
      .then(response => response.json())
      .then(data => {
          // console.log(data);
          var nameValue = data['name'];
          var lattitude = data['coord']['lat'];
          var longitude = data['coord']['lon'];
          var tempValue = data['main']['temp'];
          var descValue = data['weather'][0]['description'];
      

        // name.innerHTML = inputValue.value;
        latt.innerHTML = `Lattitude : +${lattitude}`;
        long.innerHTML = `Longitude : +${longitude}`;
        temp.innerHTML = `Temperature : +${tempValue}° <span>C<span> `;
        desc.innerHTML = descValue;
      })

      .catch(err => alert("Wrong city name!"))
})

button2.addEventListener('click',function(){

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&units=metric&appid=b7da5629f1d1f7f9d57bcac93283fac2')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // var dateValue = data['list']['0']['clouds']['dt_txt'];
      // var descValue = data['list']['0']['weather'][0]['description'];
      var tmaxValue = data['list']['0']['main']['temp_max'];
      var tminValue = data['list']['0']['main']['temp_min'];
      var descValue = data['list']['0']['weather'][0]['description'];

      date1.innerHTML = "TODAY";
      tmax1.innerHTML = `Max-Temperature : +${tmaxValue}° <span>C<span> `;
      tmin1.innerHTML = `Min-Temperature : +${tminValue}° <span>C<span> `;
      desc1.innerHTML = descValue;


      var tmaxValue = data['list']['8']['main']['temp_max'];
      var tminValue = data['list']['8']['main']['temp_min'];
      var descValue = data['list']['8']['weather'][0]['description'];

      date2.innerHTML = "TOMORROW";
      tmax2.innerHTML = `Max-Temperature : +${tmaxValue}° <span>C<span> `;
      tmin2.innerHTML = `Min-Temperature : +${tminValue}° <span>C<span> `;
      desc2.innerHTML = descValue;

      var tmaxValue = data['list']['16']['main']['temp_max'];
      var tminValue = data['list']['16']['main']['temp_min'];
      var descValue = data['list']['16']['weather'][0]['description'];

      date3.innerHTML = "DAY AFTER TOMORROW";
      tmax3.innerHTML = `Max-Temperature : +${tmaxValue}° <span>C<span> `;
      tmin3.innerHTML = `Min-Temperature : +${tminValue}° <span>C<span> `;
      desc3.innerHTML = descValue;
    })

    .catch(err => alert("Wrong city name!"))
})