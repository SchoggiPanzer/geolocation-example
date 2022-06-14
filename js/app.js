function setCoordText(latitude, longitude) {
    let lat = document.getElementById('lat-container');
    let long = document.getElementById('long-container');

    lat.innerText = 'Lat: ' + latitude;
    long.innerText = 'Long: ' + longitude;
}

const setUpMap = position => {
    setCoordText(position.coords.latitude, position.coords.longitude);

    let map = L.map('leaflet-map');
    map.setView([position.coords.latitude, position.coords.longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
}

const handleError = () => {
    alert("Entschuldigung, keine Positionsinformationen sind verfügbar.");
}

if ("geolocation" in navigator) {
   const posBtn = document.getElementById('position-btn');

   const geoOptions = {
       enableHighAccuracy: true,
   }

   posBtn.addEventListener('click', ev => {
       ev.preventDefault();
       posBtn.disabled = true;

       navigator.geolocation.getCurrentPosition(setUpMap, handleError, geoOptions);
   })
} else {
    alert('Geolocation doesn\'t work in your current browser!');
}