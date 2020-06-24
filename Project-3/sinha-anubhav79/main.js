let location = document.querySelector('#location')
let button = document.querySelector('.search_button')
let description = document.querySelector('.desc')
let temperature = document.querySelector('.temp')
let latitude = document.querySelector('.lat')
let longitude = document.querySelector('.long')
let humidity = document.querySelector('.humidity')
let wind = document.querySelector('.wind')
//const apiID = ce74ce40545b40e7266cc1f223f7f38c

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+location.value+'&appid=ce74ce40545b40e7266cc1f223f7f38c'
    )
    .then(response => response.json())
    .then(data => {
        description.innerHTML = data['weather'][0]['description'];
        temperature.innerHTML = Math.round(data['main']['temp']-273)+' &degC';
        location.value = data['name']+', '+data['sys']['country'];
        latitude.innerHTML = data['coord']['lat'];
        longitude.innerHTML = data['coord']['lon'];
        humidity.innerHTML = data['main']['humidity'];
        wind.innerHTML = data['wind']['speed'];
        console.log(data)
    })
})

function setTodayDate() {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var today = new Date();
    var dateHeader = document.getElementById('date');

    var day = weekday[today.getDay()];
    var date = monthNames[today.getMonth()] +' '+ today.getDate()
    console.log(dateHeader)
    dateHeader.innerHTML = "<strong>" + day + "</strong></strong>, " + date;
}

setTodayDate()