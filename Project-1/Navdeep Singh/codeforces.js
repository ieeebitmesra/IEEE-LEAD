"use strict"

var obj;
fetch("https://codeforces.com/api/user.info?handles=navdeepsingh.26.2000")
.then(response => response.json() )
  .then(data => { 
    let result=data.result[0];
    var handle=result.handle;
    var rating=result.rating;
    var rank=result.rank;
    $(".handle").html("Handle:"+String(handle));
    $(".rating").html("Rating:"+String(rating));
    $(".rank").html("Rank:"+String(rank));
  })
  .catch(error => console.log(error))