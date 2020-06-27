var map = window.api.map;
map.panTo(new L.latLng(29.8, -94.8));
map.setZoom(9);

// tile ids from config
var tile_ids = [];
var tile_layers = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
        tile_ids = JSON.parse(xmlhttp.responseText).tile_ids;

        // add all tiles to map
        tile_ids.forEach(function (tile) {
            var layer = L.tileLayer('https://stormscdn.ngs.noaa.gov/' + tile + '/{z}/{x}/{y}');
            layer.zIndex = -60;
            tile_layers.push(layer);
            map.addLayer(layer);
        });     
        
        // ocean overlay 
        setTimeout(checkVariable, 100);
    }
};
xmlhttp.open("GET","../config.json",true);
xmlhttp.send();

// wait for lib load
var ocean_layer;
function checkVariable() {

    // water overlay
    var vectorStyles = {
        water: {	
            fill: true,
            weight: 0,
            fillColor: '#6bbcdb',
            fillOpacity: 1,
        },
    };
    var openMapTilesUrl = "https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key={key}";
    ocean_layer = L.vectorGrid.protobuf(openMapTilesUrl, {
        rendererFactory: L.canvas.tile,
        vectorTileLayerStyles: vectorStyles,
        key: '1p3TB7AQJIi6eNmpXcD5',
        subdomains: '0123',
        maxNativeZoom: 14
    });

    // toggle ocean visibility
    L.easyButton('fa-globe', function(btn, map){
        if (map.hasLayer(ocean_layer)) {
            map.removeLayer(ocean_layer);
        }
        else {
            map.addLayer(ocean_layer);
        }
    }).addTo(map);

    // opacity slider
    var slider = L.control.range({
        position: 'topleft',
        min: 0,
        max: 1,
        value: 1,
        step: 0.05,
        orient: 'vertical',
        icon: false
    });
    slider.on('input change', function(e) {
        tile_layers.forEach(function (layer) {
            layer.setOpacity(e.value);
        });
    });
    map.addControl(slider);
}