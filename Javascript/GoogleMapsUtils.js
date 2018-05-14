
$(document).ready(init);

function init() {

    $("#search-btn").on("click", googleSearch);
    $("#renderBtn").on("click", renderPDF);
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

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}


function dropMarker(endMarker, num) {

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

    var element = $('#map');
    var pdfOptions = {
        orientation: "portrait",
        unit: "mm",    
        format: "legal"
    };

    var doc = new jsPDF(pdfOptions);
    var pageWidth = doc.internal.pageSize.width-20;
    var width = pageWidth;

    html2canvas(element, {
        useCORS: true,
        onrendered: function(canvas) {
            var imgWidth = element.width();
            var imgHeight = element.height();
            var height = (pageWidth * imgHeight)/imgWidth
            var imgData = canvas.toDataURL('image/png;base64');
            doc.addImage(imgData, 'PNG', 10, 30 , width, height);
            doc.save('map.pdf');
        }
    });
}

function getStaticMap() {

    //this is ot needed to render a pdf, but could be handy in some cases.

    $('#static-map').attr('src','http://maps.google.com/maps/api/staticmap?size=640x375'+
    '&amp;markers=label:1|'+ $("#lat-input1").val() +','+ $("#long-input1").val() +
    '&amp;markers=label:2|'+ $("#lat-input2").val() +','+ $("#long-input2").val() +
    '&amp;markers=label:3|'+ $("#lat-input3").val() +','+ $("#long-input3").val() +
    '&amp;markers=label:4|'+ $("#lat-input4").val() +','+ $("#long-input4").val() +
    '&amp;markers=label:5|'+ $("#lat-input5").val() +','+ $("#long-input5").val()); //create a static google map

}