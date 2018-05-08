
$(document).ready(init);

function init() {

    $("#search-btn").on("click", googleSearch);
    $("#renderBtn").on("click", renderPDF);
    google.maps.event.addDomListener(window, 'load', initialize);
}

var map;
var endMarker;
var geocoder;


function initMap() {

    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var lat = $("#lat-input").val();
    var long = $("#long-input").val();
    
    var ewu = new google.maps.LatLng(47.492803830404036, -117.58786034393313);
    
    var mapOptions = {
        zoom: 15,
        center: ewu
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}


function dropPin() {

    endMarker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        draggable: true
    });
    copyMarkerPositionToInput();

    google.maps.event.addListener(endMarker, 'dragend', function () {
        copyMarkerPositionToInput();
    });
}



function copyMarkerPositionToInput() {

    var latitude = endMarker.getPosition().lat();
    var longitude = endMarker.getPosition().lng();

    $("#long-input").val(longitude);
    $("#lat-input").val(latitude);
}


function googleSearch() {

    var searchTerm = $("#search-input").val();

    console.log(searchTerm);

    geocoder.geocode( { 'address': searchTerm}, function(results, status) {
        
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
        } else {
            alert('Uh Oh: ' + status);
        }
    });
}

function renderPDF() {

    $('#static-map').attr('src',''); //create a static google map

}