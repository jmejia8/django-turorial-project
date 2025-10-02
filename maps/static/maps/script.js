// Global variables
let map;
let markers = [];
let routeLine = null;
let markerGroup;

function routeToString() {
    let str = "";
    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i].getLatLng();
        str += marker.lat + "," + marker.lng + ";";
    }
    //console.log(str)
    return str
}

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
});

// Initialize the map with Leaflet
function initializeMap() {
    // Create the map centered on a default location (New York City)
    map = L.map('map').setView([25.4428343,-100.9686454], 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Create a layer group for markers
    markerGroup = L.layerGroup().addTo(map);
    
    console.log('Map initialized successfully');
}

// Set up event listeners for buttons and map clicks
function setupEventListeners() {
    // Add marker on map click
    map.on('click', function(e) {
        addMarker(e.latlng);
    });
    
    // Button event listeners
    document.getElementById('clearMarkers').addEventListener('click', clearAllMarkers);
    document.getElementById('clearRoute').addEventListener('click', clearRoute);
    document.getElementById('drawRoute').addEventListener('click', drawRoute);
}

// Add a marker to the map
function addMarker(latlng) {
    // Create a custom marker icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #ff4757; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    // Create the marker
    const marker = L.marker(latlng, { icon: customIcon });
    
    // Add popup with marker info
    const markerNumber = markers.length + 1;
    marker.bindPopup(`
        <div style="text-align: center;">
            <strong>Marker ${markerNumber}</strong><br>
            <small>Lat: ${latlng.lat.toFixed(4)}</small><br>
            <small>Lng: ${latlng.lng.toFixed(4)}</small><br>
            <button onclick="removeMarker(${markers.length})" style="margin-top: 5px; padding: 5px 10px; background: #ff4757; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>
        </div>
    `);
    
    // Add marker to the group and array
    marker.addTo(markerGroup);
    markers.push(marker);
    
    console.log(`Marker added at: ${latlng.lat}, ${latlng.lng}`);
    
    // Auto-draw route if there are 2 or more markers
    if (markers.length >= 2) {
        drawRoute();
    }
    // update input in form
    const inputElement = document.getElementById("data");
    inputElement.value = routeToString();
}

// Remove a specific marker
function removeMarker(index) {
    if (index >= 0 && index < markers.length) {
        markerGroup.removeLayer(markers[index]);
        markers.splice(index, 1);
        
        // Update marker numbers in popups
        updateMarkerNumbers();
        
        // Redraw route if there are still 2+ markers
        if (markers.length >= 2) {
            drawRoute();
        } else {
            clearRoute();
        }
        
        console.log(`Marker ${index + 1} removed`);
    }
}

// Update marker numbers in popups
function updateMarkerNumbers() {
    markers.forEach((marker, index) => {
        const latlng = marker.getLatLng();
        marker.setPopupContent(`
            <div style="text-align: center;">
                <strong>Marker ${index + 1}</strong><br>
                <small>Lat: ${latlng.lat.toFixed(4)}</small><br>
                <small>Lng: ${latlng.lng.toFixed(4)}</small><br>
                <button onclick="removeMarker(${index})" style="margin-top: 5px; padding: 5px 10px; background: #ff4757; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>
            </div>
        `);
    });
}

// Draw route connecting all markers
function drawRoute() {
    if (markers.length < 2) {
        alert('You need at least 2 markers to draw a route!');
        return;
    }
    
    // Clear existing route
    clearRoute();
    
    // Get coordinates from all markers
    const coordinates = markers.map(marker => marker.getLatLng());
    
    // Create a polyline to connect all markers
    routeLine = L.polyline(coordinates, {
        color: '#ff4757',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 5'
    }).addTo(map);
    
    // Add animation to the route line
    routeLine.setStyle({
        className: 'route-line'
    });
    
    console.log(`Route drawn connecting ${markers.length} markers`);
}

// Clear the route line
function clearRoute() {
    if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
        console.log('Route cleared');
    }
}

// Clear all markers and routes
function clearAllMarkers() {
    // Clear markers
    markerGroup.clearLayers();
    markers = [];
    
    // Clear route
    clearRoute();
    
    console.log('All markers and routes cleared');
}

// Utility function to get distance between two points (in kilometers)
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Calculate total route distance
function calculateRouteDistance() {
    if (markers.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 0; i < markers.length - 1; i++) {
        const current = markers[i].getLatLng();
        const next = markers[i + 1].getLatLng();
        totalDistance += getDistance(current.lat, current.lng, next.lat, next.lng);
    }
    
    return totalDistance;
}



// Export functions for global access
window.removeMarker = removeMarker;
