const setCoordText = (latitude, longitude) => {
    let lat = document.getElementById('lat-container');
    let long = document.getElementById('long-container');

    lat.innerText = 'Lat: ' + latitude;
    long.innerText = 'Long: ' + longitude;
}

const addTracking = () => {
    navigator.geolocation.watchPosition(updatePosition, handleError, {enableHighAccuracy: true})
}

const updatePosition = position => {
    const latLng = L.latLng(position.coords.latitude, position.coords.longitude);
    console.log('new Pos: ', latLng);
    window.myMarker.setLatLng(latLng);
}

const setUpMap = position => {
    setCoordText(position.coords.latitude, position.coords.longitude);
    const latLng = L.latLng(position.coords.latitude, position.coords.longitude);
    console.log('init Pos: ', latLng);

    let map = L.map('leaflet-map');
    map.setView(latLng, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    window.myMarker = L.marker(latLng).addTo(map);

    addTracking();
}

const handleError = () => {
    alert("Entschuldigung, keine Positionsinformationen sind verfügbar.");
}

if ("geolocation" in navigator) {
   const posBtn = document.getElementById('position-btn');

   posBtn.addEventListener('click', ev => {
       ev.preventDefault();
       posBtn.disabled = true;

       navigator.geolocation.getCurrentPosition(setUpMap, handleError,{enableHighAccuracy: true});
   })
} else {
    alert('Geolocation doesn\'t work in your current browser!');
}