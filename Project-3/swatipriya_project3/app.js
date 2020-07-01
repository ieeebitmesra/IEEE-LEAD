//defining variables .
var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var hum = document.querySelector('.hum');
var tempmin = document.querySelector('.tempmin');
var tempmax = document.querySelector('.tempmax');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var lat = document.querySelector('#lat');
var lon = document.querySelector('#lon');
var country = document.querySelector('.country');
var button = document.querySelector('.submit');
var descS = document.querySelector('.descS');
var humS = document.querySelector('.humS');
var preS = document.querySelector('.preS');
var tempS = document.querySelector('.tempS');
var main_Desc = document.querySelector('.main_Desc');


var input1 = document.querySelector('.input_text1');
var button1 = document.querySelector('.submit1');

var longValue;
var latValue;
//variables for forecast.
var date1 = document.querySelector('.date1');
var tempmin1 = document.querySelector('.tempmin1');
var tempmax1 = document.querySelector('.tempmax1');
var hum1 = document.querySelector('.hum1');
var pre1 = document.querySelector('.pre1');
var desc1 = document.querySelector('.desc1');

var date2 = document.querySelector('.date2');
var tempmin2 = document.querySelector('.tempmin2');
var tempmax2 = document.querySelector('.tempmax2');
var hum2 = document.querySelector('.hum2');
var pre2 = document.querySelector('.pre2');
var desc2 = document.querySelector('.desc2');

var date3 = document.querySelector('.date3');
var tempmin3 = document.querySelector('.tempmin3');
var tempmax3 = document.querySelector('.tempmax3');
var hum3 = document.querySelector('.hum3');
var pre3 = document.querySelector('.pre3');
var desc3 = document.querySelector('.desc3');

var date4 = document.querySelector('.date4');
var tempmin4 = document.querySelector('.tempmin4');
var tempmax4 = document.querySelector('.tempmax4');
var hum4 = document.querySelector('.hum4');
var pre4 = document.querySelector('.pre4');
var desc4 = document.querySelector('.desc4');

var date5 = document.querySelector('.date5');
var tempmin5 = document.querySelector('.tempmin5');
var tempmax5 = document.querySelector('.tempmax5');
var hum5 = document.querySelector('.hum5');
var pre5 = document.querySelector('.pre5');
var desc5 = document.querySelector('.desc5');

var date6 = document.querySelector('.date6');
var tempmin6 = document.querySelector('.tempmin6');
var tempmax6 = document.querySelector('.tempmax6');
var hum6 = document.querySelector('.hum6');
var pre6 = document.querySelector('.pre6');
var desc6 = document.querySelector('.desc6');

var date7 = document.querySelector('.date7');
var tempmin7 = document.querySelector('.tempmin7');
var tempmax7 = document.querySelector('.tempmax7');
var hum7 = document.querySelector('.hum7');
var pre7 = document.querySelector('.pre7');
var desc7 = document.querySelector('.desc7');

var date8 = document.querySelector('.date8');
var tempmin8 = document.querySelector('.tempmin8');
var tempmax8 = document.querySelector('.tempmax8');
var hum8 = document.querySelector('.hum8');
var pre8 = document.querySelector('.pre8');
var desc8 = document.querySelector('.desc8');



//To display searched city weather details.

button.addEventListener('click', function(name) {
        fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + input.value + '&appid=313c8d17c23547867cd8147fc1d70807')
            .then(response => response.json())
            .then(data => {
                var tempValue = data['main']['temp'];
                var humidityValue = data['main']['humidity'];
                var tempminValue = data['main']['temp_min'];
                var tempmaxValue = data['main']['temp_max'];
                var nameValue = data['name'];
                var descValue = data['weather'][0]['description'];
                var mainDesc = data['weather'][0]['main'];
                longValue = data['coord']['lon'];
                latValue = data['coord']['lat'];
                var countryValue = data['sys']['country'];
                main.innerHTML = "City - " + nameValue;
                country.innerHTML = "Country - " + countryValue;
                desc.innerHTML = "Desc - " + descValue;
                temp.innerHTML = "Temp - " + tempValue + " ° C";
                hum.innerHTML = "Humidity - " + humidityValue + " %";
                tempmin.innerHTML = "Min Temp - " + tempminValue + " ° C";
                tempmax.innerHTML = "Max Temp - " + tempmaxValue + " ° C";
                lat.innerHTML = "latitude - " + latValue;
                lon.innerHTML = "longitude - " + longValue;
                main_Desc.innerHTML = "Main Desc -" + mainDesc;
                input.value = "";


                // To display 7 days weather forecast .

                fetch('https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=' + latValue + '&lon=' + longValue + '&exclude=current,hourly,minutely&appid=313c8d17c23547867cd8147fc1d70807')
                    .then(response => response.json())
                    .then(dat => {

                        var time1 = dat['daily'][0]['dt'];
                        var temp_min1 = dat['daily'][0]['temp']['min'];
                        var temp_max1 = dat['daily'][0]['temp']['max'];
                        var humidity1 = dat['daily'][0]['humidity'];
                        var pressure1 = dat['daily'][0]['pressure'];
                        var description1 = dat['daily'][0]['weather'][0]['description'];
                        date1.innerHTML = moment(time1 * 1000).format("DD-MM-YYYY ");
                        tempmin1.innerHTML = "Min Temp - " + temp_min1 + " ° C";
                        tempmax1.innerHTML = "Max Temp - " + temp_max1 + " ° C";
                        hum1.innerHTML = "Humitidy - " + humidity1 + " %";
                        pre1.innerHTML = "Pressure - " + pressure1 + " hPa";
                        desc1.innerHTML = "Desc - ' " + description1 + " '";

                        var time2 = dat['daily'][1]['dt'];
                        var temp_min2 = dat['daily'][1]['temp']['min'];
                        var temp_max2 = dat['daily'][1]['temp']['max'];
                        var humidity2 = dat['daily'][1]['humidity'];
                        var pressure2 = dat['daily'][1]['pressure'];
                        var description2 = dat['daily'][1]['weather'][0]['description'];
                        date2.innerHTML = moment(time2 * 1000).format("DD-MM-YYYY ");
                        tempmin2.innerHTML = "Min Temp - " + temp_min2 + " ° C";
                        tempmax2.innerHTML = "Max Temp - " + temp_max2 + " ° C";
                        hum2.innerHTML = "Humitidy - " + humidity2 + " %";
                        pre2.innerHTML = "Pressure - " + pressure2 + " hPa";
                        desc2.innerHTML = "Desc - ' " + description2 + " '";

                        var time3 = dat['daily'][2]['dt'];
                        var temp_min3 = dat['daily'][2]['temp']['min'];
                        var temp_max3 = dat['daily'][2]['temp']['max'];
                        var humidity3 = dat['daily'][2]['humidity'];
                        var pressure3 = dat['daily'][2]['pressure'];
                        var description3 = dat['daily'][2]['weather'][0]['description'];
                        date3.innerHTML = moment(time3 * 1000).format("DD-MM-YYYY ");
                        tempmin3.innerHTML = "Min Temp - " + temp_min3 + " ° C";
                        tempmax3.innerHTML = "Max Temp - " + temp_max3 + " ° C";
                        hum3.innerHTML = "Humitidy - " + humidity3 + " %";
                        pre3.innerHTML = "Pressure - " + pressure3 + " hPa";
                        desc3.innerHTML = "Desc - ' " + description3 + " '";

                        var time4 = dat['daily'][3]['dt'];
                        var temp_min4 = dat['daily'][3]['temp']['min'];
                        var temp_max4 = dat['daily'][3]['temp']['max'];
                        var humidity4 = dat['daily'][3]['humidity'];
                        var pressure4 = dat['daily'][3]['pressure'];
                        var description4 = dat['daily'][3]['weather'][0]['description'];
                        date4.innerHTML = moment(time4 * 1000).format("DD-MM-YYYY ");
                        tempmin4.innerHTML = "Min Temp - " + temp_min4 + " ° C";
                        tempmax4.innerHTML = "Max Temp - " + temp_max4 + " ° C";
                        hum4.innerHTML = "Humitidy - " + humidity4 + " %";
                        pre4.innerHTML = "Pressure - " + pressure4 + " hPa";
                        desc4.innerHTML = "Desc - ' " + description4 + " '";

                        var time5 = dat['daily'][4]['dt'];
                        var temp_min5 = dat['daily'][4]['temp']['min'];
                        var temp_max5 = dat['daily'][4]['temp']['max'];
                        var humidity5 = dat['daily'][4]['humidity'];
                        var pressure5 = dat['daily'][4]['pressure'];
                        var description5 = dat['daily'][4]['weather'][0]['description'];
                        date5.innerHTML = moment(time5 * 1000).format("DD-MM-YYYY ");
                        tempmin5.innerHTML = "Min Temp - " + temp_min5 + " ° C";
                        tempmax5.innerHTML = "Max Temp - " + temp_max5 + " ° C";
                        hum5.innerHTML = "Humitidy - " + humidity5 + " %";
                        pre5.innerHTML = "Pressure - " + pressure5 + " hPa";
                        desc5.innerHTML = "Desc - ' " + description5 + " '";

                        var time6 = dat['daily'][5]['dt'];
                        var temp_min6 = dat['daily'][5]['temp']['min'];
                        var temp_max6 = dat['daily'][5]['temp']['max'];
                        var humidity6 = dat['daily'][5]['humidity'];
                        var pressure6 = dat['daily'][5]['pressure'];
                        var description6 = dat['daily'][5]['weather'][0]['description'];
                        date6.innerHTML = moment(time6 * 1000).format("DD-MM-YYYY ");
                        tempmin6.innerHTML = "Min Temp - " + temp_min6 + " ° C";
                        tempmax6.innerHTML = "Max Temp - " + temp_max6 + " ° C";
                        hum6.innerHTML = "Humitidy - " + humidity6 + " %";
                        pre6.innerHTML = "Pressure - " + pressure6 + " hPa";
                        desc6.innerHTML = "Desc - ' " + description6 + " '";

                        var time7 = dat['daily'][6]['dt'];
                        var temp_min7 = dat['daily'][6]['temp']['min'];
                        var temp_max7 = dat['daily'][6]['temp']['max'];
                        var humidity7 = dat['daily'][6]['humidity'];
                        var pressure7 = dat['daily'][6]['pressure'];
                        var description7 = dat['daily'][6]['weather'][0]['description'];
                        date7.innerHTML = moment(time7 * 1000).format("DD-MM-YYYY ");
                        tempmin7.innerHTML = "Min Temp - " + temp_min7 + " ° C";
                        tempmax7.innerHTML = "Max Temp - " + temp_max7 + " ° C";
                        hum7.innerHTML = "Humitidy - " + humidity7 + " %";
                        pre7.innerHTML = "Pressure - " + pressure7 + " hPa";
                        desc7.innerHTML = "Desc - ' " + description7 + " '";

                        var time8 = dat['daily'][7]['dt'];
                        var temp_min8 = dat['daily'][7]['temp']['min'];
                        var temp_max8 = dat['daily'][7]['temp']['max'];
                        var humidity8 = dat['daily'][7]['humidity'];
                        var pressure8 = dat['daily'][7]['pressure'];
                        var description8 = dat['daily'][7]['weather'][0]['description'];
                        date8.innerHTML = moment(time8 * 1000).format("DD-MM-YYYY ");
                        tempmin8.innerHTML = "Min Temp - " + temp_min8 + " ° C";
                        tempmax8.innerHTML = "Max Temp - " + temp_max8 + " ° C";
                        hum8.innerHTML = "Humitidy - " + humidity8 + " %";
                        pre8.innerHTML = "Pressure - " + pressure8 + " hPa";
                        desc8.innerHTML = "Desc - ' " + description8 + " '";


                        // switch case for background .
                        switch (mainDesc) {
                            case 'Clear':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("sunny.jpg")';

                                break;
                            case 'Clouds':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("cloudy.jpeg")';
                                break;
                            case 'Rain':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("rainy.jpg")';
                                break;
                            case 'Drizzle':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("rainy.jpg")';
                                break;
                            case 'Thunderstorm':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("storm.jpg")';
                                break;
                            case 'Snow':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("snowy.jpg")';
                                break;
                            case 'Smoke':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("smoke.jpg")';
                                break;
                            case 'Mist':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("mist.jpg")';
                                break;
                            case 'Haze':
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("haze.jpg")';

                                break;
                            default:
                                document.getElementsByClassName("first")[0].style.backgroundImage = 'url("bases.jpg")';
                                break;

                        }


                    })
            })

        .catch(err => alert("Wrong city name!"));
    })
    // To display past weather details.
button1.addEventListener('click', function(name) {
    let inpDate = input1.value;
    let date = moment('inpDate', 'YYYY.MM.DD').unix();
    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + latValue + '&lon=' + longValue + '&dt=' + date + '&units=metric&appid=313c8d17c23547867cd8147fc1d70807')
        .then(response => response.json())
        .then(da => {
            var humSearch = da['current']['humidity'];
            var preSearch = da['current']['pressure'];
            var tempSearch = da['current']['temp'];
            var weatherSearch = da['current']['weather'][0]['description'];
            tempS.innerHTML = "Temp - " + tempSearch + " ° C";
            humS.innerHTML = "Humidity - " + humSearch + " %";
            preS.innerHTML = "Pressure - " + preSearch + " hPa";
            descS.innerHTML = "Desc - ' " + weatherSearch + " '";
        })


    .catch(err => alert("Wrong date!"));
})