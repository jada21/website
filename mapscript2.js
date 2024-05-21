let map;
let marker;

function fetchLatestLocation() 
{  
  const request = new XMLHttpRequest();
  request.open('GET', 'http://3.145.165.110:8000/website');
  // onload is a callback function which waits until 'request' receives a successful response before 
  // execution. Assures asynchronous behaviour
  request.onload = function() 
  {
    if (request.status >= 200 && request.status < 400) 
    {
      const response = request.responseText;
      const values = JSON.parse(response);        //converts JSON string response into array
      const lat2 = parseFloat(values[0]);          //converts the string to a float
      const lng2 = parseFloat(values[1]); 
      const temp = parseFloat(values[2]); 
      // document.getElementById("getValue").textContent = response;
      // document.getElementById("lat").textContent = lat2;
      // document.getElementById("lng").textContent = lng2;
      // document.getElementById("temp").textContent = temp;
      updateMap(lat2, lng2);
      displayData(lat2, lng2, temp)
    } 
    else 
    {
      console.error('Failed to load data from server.');
    }
  };
  request.onerror = function() 
  {
    console.error('Connection error while trying to load data from server.');
  };
  request.send();
}

function updateMap(x,y)
{
  const location = {lat: x, lng: y};
  map.setCenter(location);
  marker.position= location;
}

// Initialize and add the map
async function initMap() 
{
  var initlocation = {lat: 0, lng: 0};        
  //var initlocation = {lat: 18.00375, lng: -76.76379}  used for testing 
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
  // Creating a new map
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: initlocation,
    mapId: "DEMO_MAP_ID",
  });
  console.log("Map initialized:", map);
  
  // const pinkMarkerImg = document.createElement("img");
  // pinkMarkerImg.src = "pinkMarker.svg" ; //"pinkmapmarker.png";    
  
  // pinBackground = new PinElement({
  //   background: "#EF476F",
  // });

  marker = new AdvancedMarkerElement({                              //maybe this does not need to be a const    
    map: map,                                                       //specify map that marker will be placed on
    position: initlocation,
    //content: pinBackground.element,
    //content: pinkMarkerImg,
  });
  
  console.log("Marker created:", marker);
  fetchLatestLocation();
  setInterval(fetchLatestLocation, 3000); // Adjust the interval as needed, every 3 secs
}

async function  displayData(lat, lng, temp)
{
  document.getElementById("lat").textContent = lat;
  document.getElementById("lng").textContent = lng;
  document.getElementById("temp").textContent = temp + "°C";
}

document.addEventListener("DOMContentLoaded", function() 
{
  initMap();
});



