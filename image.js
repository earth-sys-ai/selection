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
    if (typeof L.vectorGrid !== 'undefined') {

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
    }
}

// set tile opacity
var alpha = 1;
function set_opacity(alpha) {
    tile_layers.forEach(function (layer) {
        layer.setOpacity(alpha);
    }); 
}

// toggle ocean visibility
L.easyButton('fa-globe', function(btn, map){
    if (map.hasLayer(ocean_layer)) {
        map.removeLayer(ocean_layer);
    }
    else {
        map.addLayer(ocean_layer);
    }
}).addTo(map);

// alpha adjustment
L.easyButton('fa-plus', function(btn, map){
    if (alpha == 1) { return; }
    alpha += 0.1;
    set_opacity(alpha);
}).addTo(map);
L.easyButton('fa-minus', function(btn, map){
    if (alpha == 0) { return; }
    alpha -= 0.1;
    set_opacity(alpha);
}).addTo(map);




