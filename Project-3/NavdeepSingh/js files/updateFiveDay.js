function updateFiveDaysContent(data){
    for(var i=0;i<6;i++)
    {
        var select=".five-day-row-date-"+i;
        if(i>=2)
        {
            var day=timestampToDate(data.daily[i].dt);
            day=day.substring(5,16);
            console.log(day);
            $(select).html(day);
        }
    }
    for(var i=0;i<6;i++)
    {
        select=".five-day-png-"+i;
        $(select).attr("src","images/png/"+data.daily[i].weather[0].icon+"@2x.png");
        select=".five-day-desc-"+i;
        $(select).html(uppercase(data.daily[i].weather[0].description));
        select=".five-day-min-max-"+i;
        $(select).html(Math.round(kToC(data.daily[i].temp.max))+"°C/"+Math.round(kToC(data.daily[i].temp.min))+"°C");
        select=".sunrise-"+i;
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
        select=".sunset-"+i;
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
        select=".uv-index-"+i;
        $(select).html(data.daily[i].uvi);
        select=".humidity-"+i;
        $(select).html(data.daily[i].humidity+"%");

    }
}