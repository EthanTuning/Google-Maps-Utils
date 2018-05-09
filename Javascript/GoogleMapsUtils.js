
$(document).ready(init);

function init() {

    $("#search-btn").on("click", googleSearch);
    $("#renderBtn").on("click", renderPDF);
    //google.maps.event.addDomListener(window, 'load', initialize);
}

var map;
var endMarker1;
var endMarker2;
var endMarker3;
var endMarker4;
var endMarker5;
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


function dropPin(endMarker, num) {

    endMarker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        draggable: true
    });
    copyMarkerPositionToInput(endMarker, num);

    google.maps.event.addListener(endMarker, 'dragend', function () {
        copyMarkerPositionToInput(endMarker, num);
    });
}



function copyMarkerPositionToInput(endMarker, num) {

    var latitude = endMarker.getPosition().lat();
    var longitude = endMarker.getPosition().lng();

    if(num == 1) {
        $("#long-input1").val(longitude);
        $("#lat-input1").val(latitude);
    }

    if(num == 2) {
        $("#long-input2").val(longitude);
        $("#lat-input2").val(latitude);
    }

    if(num == 3) {
        $("#long-input3").val(longitude);
        $("#lat-input3").val(latitude);
    }

    if(num == 4) {
        $("#long-input4").val(longitude);
        $("#lat-input4").val(latitude);
    }

    if(num == 5) {
        $("#long-input5").val(longitude);
        $("#lat-input5").val(latitude);
    }
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

    $('#static-map').attr('src','http://maps.google.com/maps/api/staticmap?size=640x375'+
                                '&amp;markers=label:1|'+ endMarker1.getPosition().lat() +','+ endMarker1.getPosition().lng() +''+
                                '&amp;markers=label:2|'+ endMarker2.getPosition().lat() +','+ endMarker2.getPosition().lng() +''+
                                '&amp;markers=label:3|'+ endMarker3.getPosition().lat() +','+ endMarker3.getPosition().lng() +''+
                                '&amp;markers=label:4|'+ endMarker4.getPosition().lat() +','+ endMarker4.getPosition().lng() +''+
                                '&amp;markers=label:5|'+ endMarker5.getPosition().lat() +','+ endMarker5.getPosition().lng() +''); //create a static google map

    html2canvas($('#static-map'), {
        useCORS: true,
        onrendered: function(canvas) {
            var img =canvas.toDataURL("image/jpeg,1.0");
            var pdf = new jsPDF();
            pdf.addImage(img, 'JPEG', 15, 40, 180, 180);
            pdf.save('map.pdf')
        }
    });
}