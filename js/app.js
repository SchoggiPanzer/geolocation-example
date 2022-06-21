const setPositionDatas = position => {
    let lat = document.getElementById('lat-container');
    let long = document.getElementById('long-container');
    let speed = document.getElementById('speed-container');

    lat.innerText = 'Lat: ' + position.coords.latitude;
    long.innerText = 'Long: ' + position.coords.longitude;
    speed.innerText = 'Speed: ' + position.coords.speed;
}

const startTracking = () => {
    console.log('Start position tracker');
    return navigator.geolocation.watchPosition(updatePosition, handleError, {enableHighAccuracy: true})
}

const stopTracking = watchId => {
    console.log('Stop position tracker');
    navigator.geolocation.clearWatch(watchId);
}

const updatePosition = position => {
    setPositionDatas(position);
    const latLng = L.latLng(position.coords.latitude, position.coords.longitude);
    console.log('new Pos: ', latLng);
    window.myMarker.setLatLng(latLng);
}

const setUpMap = position => {
    console.log('setup map');
    setPositionDatas(position);
    const latLng = L.latLng(position.coords.latitude, position.coords.longitude);
    console.log('init Pos: ', latLng);

    let map = L.map('leaflet-map');
    map.setView(latLng, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    window.myMarker = L.marker(latLng).addTo(map);

    document.getElementById('tracking-btn').disabled = false;
}

const handleError = () => {
    alert("Entschuldigung, keine Positionsinformationen sind verfügbar.");
}

if ("geolocation" in navigator) {
   const posBtn = document.getElementById('position-btn');
   const trackingBtn = document.getElementById('tracking-btn');
   let watchId = null;

   posBtn.addEventListener('click', ev => {
       console.log('Pos Btn clicked');
       ev.preventDefault();
       posBtn.disabled = true;

       navigator.geolocation.getCurrentPosition(setUpMap, handleError,{enableHighAccuracy: true});
   });

   trackingBtn.addEventListener('click', ev => {
       ev.preventDefault();

       if (!watchId) {
          watchId = startTracking();
          trackingBtn.textContent = 'Stop position tracking';
       } else {
           stopTracking(watchId);
           watchId = null;
           trackingBtn.textContent = 'Start position tracking';
       }
   });
} else {
    alert('Geolocation doesn\'t work in your current browser!');
}