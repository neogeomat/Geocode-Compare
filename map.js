var $map = L.map('map-div').setView([39.984, -0.044], 13);
var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo($map);
var $markerGroup = L.featureGroup().addTo($map);
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += "";
    return div;
};
legend.addTo($map);

$(document).on("pagebeforeshow", "#map", function() {
    window.setTimeout(function() {
        $map.invalidateSize();
        // alert();
        // console.log("map size invalidated");
    }, 1000);
});

function mapdisplay(response, service) {
    // console.log(response);
    $.each(response, function(index, response) {
        $markerGroup.addLayer(L.circleMarker(response.center, markerOptions[service]).bindPopup(response.name).addTo($map));
        $markerGroup.addLayer(L.circleMarker(response.center, L.extend(markerOptions[service], { radius: 1 })).addTo($map));
    });
    $map.fitBounds($markerGroup.getBounds());
}