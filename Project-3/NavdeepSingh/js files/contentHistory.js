$(document).ready(function(){
    $(".historical-content").hide();
});

function updatePresentValue(data,i)
{
    i=0;
    select=".historical-png-"+i;
    $(select).attr("src","images/png/"+data.daily[i].weather[0].icon+"@2x.png");
    select=".historical-desc-"+i;
    $(select).html(uppercase(data.daily[i].weather[0].description));
    select=".historical-min-max-"+i;
    $(select).html(Math.round(kToC(data.daily[i].temp.max))+"°C/"+Math.round(kToC(data.daily[i].temp.min))+"°C");
    select=".historical-sunrise-"+i;
    var hour=timestampToDate(data.daily[i].sunrise);
    hour=hour.substring(17,19);
    hour=5+parseInt(hour);
    hour=hour%24;
    var minutes=timestampToDate(data.daily[i].sunrise);
    minutes=minutes.substring(20,22);
    minutes=parseInt(minutes)+30;
    quesMinutes=minutes/60;
    remMinutes=minutes%60;
    hour+=quesMinutes;
    if(remMinutes<=9){
        $(select).html(Math.round(hour)+":0"+remMinutes);
    }
    else{
        $(select).html(Math.round(hour)+":"+remMinutes);
    }
    select=".historical-sunset-"+i;
    var hour=timestampToDate(data.daily[i].sunset);
    hour=hour.substring(17,19);
    hour=5+parseInt(hour);
    hour=hour%24;
    var minutes=timestampToDate(data.daily[i].sunset);
    minutes=minutes.substring(20,22);
    minutes=parseInt(minutes)+30;
    quesMinutes=minutes/60;
    remMinutes=minutes%60;
    hour+=quesMinutes;
    if(remMinutes<=9){
        $(select).html(Math.round(hour)+":0"+remMinutes);
    }
    else{
        $(select).html(Math.round(hour)+":"+remMinutes);
    }
    select=".historical-uv-index-"+i;
    $(select).html(data.daily[i].uvi);
    select=".historical-humidity-"+i;
    $(select).html(data.daily[i].humidity+"%");
}

function updateHistoryValues(data,i){
    var select=".historical-row-date-"+i;
    var day=timestampToDate(data.current.dt);
    day=day.substring(5,16);
    console.log(day);
    $(select).html(day);
    select=".historical-png-"+i;
    $(select).attr("src","images/png/"+data.current.weather[0].icon+"@2x.png");
    select=".historical-desc-"+i;
    $(select).html(uppercase(data.current.weather[0].description));
    select=".historical-min-max-"+i;
    $(select).html(Math.round(kToC(data.current.temp))+"°C");
    select=".historical-sunrise-"+i;
    var hour=timestampToDate(data.current.sunrise);
    hour=hour.substring(17,19);
    hour=5+parseInt(hour);
    hour=hour%24;
    var minutes=timestampToDate(data.current.sunrise);
    minutes=minutes.substring(20,22);
    minutes=parseInt(minutes)+30;
    quesMinutes=minutes/60;
    remMinutes=minutes%60;
    hour+=quesMinutes;
    if(remMinutes<=9){
        $(select).html(Math.round(hour)+":0"+remMinutes);
    }
    else{
        $(select).html(Math.round(hour)+":"+remMinutes);
    }
    select=".historical-sunset-"+i;
    var hour=timestampToDate(data.current.sunset);
    hour=hour.substring(17,19);
    hour=5+parseInt(hour);
    hour=hour%24;
    var minutes=timestampToDate(data.current.sunset);
    minutes=minutes.substring(20,22);
    minutes=parseInt(minutes)+30;
    quesMinutes=minutes/60;
    remMinutes=minutes%60;
    hour+=quesMinutes;
    if(remMinutes<=9){
        $(select).html(Math.round(hour)+":0"+remMinutes);
    }
    else{
        $(select).html(Math.round(hour)+":"+remMinutes);
    }
    select=".historical-uv-index-"+i;
    $(select).html(data.current.uvi);
    select=".historical-humidity-"+i;
    $(select).html(data.current.humidity+"%");
}

$(".historical-current-location-button").click(function(){
    $(".historical-content-display").hide();
    $(".historical-content").fadeIn();
})
$(".historical-search-location-button").click(function(){
    $(".historical-content-display").hide();
    $(".historical-content").fadeIn();
})


