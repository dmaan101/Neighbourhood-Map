        var map;
        // Create a new blank array for all the listing markers.

        function initMap() {
            //styles for map
            var styles = [

                {
                    "featureType": "water",
                    "stylers": [{
                        "color": "#19a0d8"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "weight": 6
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#e85113"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#efe9e4"
                    }, {
                        "lightness": -40
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#efe9e4"
                    }, {
                        "lightness": -20
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "lightness": 100
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "lightness": -100
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "labels.icon"
                }, {
                    "featureType": "landscape",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "landscape",
                    "stylers": [{
                        "lightness": 20
                    }, {
                        "color": "#efe9e4"
                    }]
                }, {
                    "featureType": "landscape.man_made",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "lightness": 100
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "lightness": -100
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "hue": "#11ff00"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "lightness": 100
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "hue": "#4cff00"
                    }, {
                        "saturation": 58
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#f0e4d3"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#efe9e4"
                    }, {
                        "lightness": -25
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#efe9e4"
                    }, {
                        "lightness": -10
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }

            ]
            // Constructor creates a new map - only center and zoom are required.
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 28.737324,
                    lng: 77.090981
                },
                zoom: 18,
                //added custom made map
                styles: styles,
                //do not switch between satallite and different modes
                mapTypeControl: false
            });
            //applied binding using knock out javascript
            ko.applyBindings(new viewmodel());
        }

        // This function will loop through the listings and hide them all.
        function hideListings() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }

        // This function is in response to the user selecting "show route" on one
        // of the markers within the calculated distance. This will display the route
        // on the map.
        function displayDirections(origin) {
            hideListings();
            var directionsService = new google.maps.DirectionsService;
            // Get the destination address from the user entered value.
            var destinationAddress = address;
            // Get mode again from the user entered value.
            // var mode = document.getElementById('mode').value;
            directionsService.route({
                // The origin is the passed in marker's position.
                origin: origin,
                // The destination is user entered address.
                destination: destinationAddress,
                travelMode: google.maps.TravelMode[m]
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    var directionsDisplay = new google.maps.DirectionsRenderer({
                        map: map,
                        directions: response,
                        draggable: true,
                        polylineOptions: {
                            strokeColor: 'blue'
                        }
                    });
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

        }
        var googleError = function() {
            document.getElementById('map').innerHTML = "Map didnt Worked!";
        }