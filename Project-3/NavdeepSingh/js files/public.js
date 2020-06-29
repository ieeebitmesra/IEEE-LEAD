$(document).ready(function(){
    $(".page-content").hide();
    setTimeout(function(){
        $(".ani").fadeOut();
        $(".page-content").fadeIn();
    },5000)
});


function calcTime() {
    var currentdate = new Date(); 
    var dateTime = {};
    dateTime.date=currentdate.getDate();
    dateTime.month=currentdate.getMonth();
    dateTime.year=currentdate.getFullYear() ;
    return dateTime;
}


// console.log(currentDateTime);
function dateToUnixStamp(year,month,date){
    var datum = new Date(Date.UTC(year,month,date));
    unixTimestamp=datum.getTime()/1000;
    return unixTimestamp; 
}
// dateToUnixStamp("2020","06","21");

function timestampToDate(unixTimestamp)
{
    var theDate = new Date(unixTimestamp * 1000);
    dateString = theDate.toGMTString();
    return dateString;
}

function kToC(Kelvin){
    var celcius=Kelvin-273.15;
    return celcius;
}

function uppercase(str)
{
  var array1 = str.split(' ');
  var newarray1 = [];
    
  for(var x = 0; x < array1.length; x++){
      newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
  }
  return newarray1.join(' ');
}
