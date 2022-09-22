var adventure = document.getElementById("keywordField").value;
var button = document.getElementById("keywordButton");
var keyLon = "";
var keyLat = "";
var arrivalMessage = "";
var keyDbNumber = -1;
var userKeyDist = 999;


// activates function on button press
button.addEventListener('click', keywordAttempt);


function keywordAttempt() {
    // resets adventure var to the current text in the input field
    var adventure = document.getElementById("keywordField").value;
    if (adventure.length >= 1){
        //verifying click
        console.log("clicked");
        console.log(adventure);

        //checks field entry against strings in the keywordDb array and sets vars to the second and third string in a matching array
        for (var i = 0; i < keywordDb.length; i++) {
            if (keywordDb[i][0] == adventure) {
                keyDbNumber = [i]
                keyLon = keywordDb[i][1];
                keyLat = keywordDb[i][2];
                arrivalMessage = keywordDb[i][3];   
                
                // HI ISSUE IS HERE! FOR LOOP IS CORRECTLY LOGGING INFORMATION FOR THE "TEST" INPUT BUT NOT FOR OTHER INPUTS IN THE ARRAY
                console.log(keyLat);
                               
                //setting up mapbox token
                mapboxgl.accessToken =
                "pk.eyJ1Ijoic2hlZmZpZWxkLXdjIiwiYSI6ImNsMnFlZjR3ZTBmeWczbnBjdXo5b3o3MGgifQ.VVJvgzES8fCP7XzMJ-4i0A"

                const map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL or style object
                center: [keyLon, keyLat], // starting position [lng, lat]
                zoom: 15, // starting zoom
                });

                const marker = new mapboxgl.Marker()
                    .setLngLat([keyLon, keyLat])
                    .addTo(map);
                const nav = new mapboxgl.NavigationControl()
                map.addControl(nav)
                // Add geolocate control to the map.
                var geolocate = new mapboxgl.GeolocateControl({
                    positionOptions: {
                    enableHighAccuracy: true
                    },
                    // When active the map will receive updates to the device's location as it changes.
                    trackUserLocation: true,
                    // Draw an arrow next to the location dot to indicate which direction the device is heading.
                    showUserHeading: true
                    });
                    
                map.addControl(geolocate);
                
                geolocate.on('geolocate', function(e) {
                    var userLon = e.coords.longitude;
                    var userLat = e.coords.latitude
                    var position = [userLon, userLat];
                    console.log(position);
                    
                    console.log(keyLon);
                
                    var p = 0.017453292519943295;    // Math.PI / 180
                    var c = Math.cos;
                    var a = 0.5 - c((userLat - keyLat) * p)/2 + 
                            c(keyLat * p) * c(userLat * p) * 
                            (1 - c((userLon - keyLon) * p))/2;
                
                    var userKeyDist = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
                    console.log(userKeyDist)

                    if(userKeyDist <= 0.05){
                        alert(arrivalMessage);
                    }

                    });
            }
            // otherwise, resets the vars
            /* else is somehow reseting the keyLat/Lon vars
            else {
                keyDbNumber = -1;
                keyLon = "";
                keyLat = "";
                arrivalMessage = "";
            } */
        }
    //verifying correct search
    console.log(keyDbNumber);
    console.log(keyLon);
    console.log(keyLat);
    console.log(arrivalMessage);     
    }
    

}
