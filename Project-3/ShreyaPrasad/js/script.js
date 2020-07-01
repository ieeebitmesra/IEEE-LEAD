google.maps.event.addDomListener(window, 'load', initialize)
var places;

function initialize() {
    var input = document.getElementById('place');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        places = autocomplete.getPlace();
    });

};

function getll() {
    var location = "<b>Location:</b>" + places.formatted_address + "<br/>";
    var lat = places.geometry.location.lat();
    var long = places.geometry.location.lng();
    document.getElementById('locate').innerHTML = location;
    document.getElementById('lat').innerHTML = lat;
    document.getElementById('lng').innerHTML = long;
}