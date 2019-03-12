var directionsService;
var directionsDisplay;
var directionsRenderer;
var pos;
var itb = {lat: 53.4051, lng: -6.3779};

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var travel_mode = 'DRIVING';
    var pos;

    var map = new google.maps.Map(document.getElementById("map"), {
        center: itb,
        zoom: 14
    });

    var marker = new google.maps.Marker({
        position: itb,
        map: map
    });
    google.maps.event.addDomListener(window, 'resize', function () {
        map.setCenter(itb);
    });
   // directionsDisplay.setMap(map);

  //  var infoWindow = new google.maps.InfoWindow({map: map});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );

            marker2 = new google.maps.Marker({
                position: pos,
                map: map
            });

            map.setCenter(pos);

            var route = {
                destination: itb,
                origin: pos,
                travelMode:'WALKING'
            };
            directionsService.route(route,function(response,status) {
                if (status == 'OK') {
                    directionsRenderer = new google.maps.DirectionsRenderer()
                    directionsRenderer.setDirections(response);
                    directionsRenderer.setMap(map);
                }
            });
        }, function () {
           // handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
      //  handleLocationError(false, infoWindow, map.getCenter());
    }

}
