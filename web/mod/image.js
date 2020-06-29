var map = window.api.map;

// tile ids from config
var tile_ids = [];
var tile_layers = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
        var json = JSON.parse(xmlhttp.responseText);
        tile_ids = json.tile_ids

        // add all tiles to map
        json.tile_ids.forEach(function (tile) {
            var layer = L.tileLayer('https://stormscdn.ngs.noaa.gov/' + tile + '/{z}/{x}/{y}');
            layer.zIndex = -60;
            tile_layers.push(layer);
            map.addLayer(layer);
        });     
      
        // init pos
        map.panTo(json.focus);
        map.setZoom(json.zoom_level);

        // ocean overlay 
        setTimeout(checkVariable, 500);
    }
};
xmlhttp.open("GET","mod/config.json",true);
xmlhttp.send();

// wait for lib load
var ocean_layer;
function checkVariable() {

    // water overlay
    var vectorStyles = {
        water: {	
            fill: true,
            weight: 0,
            fillColor: '#081424',
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
    map.addLayer(ocean_layer);

    // tile slider
    var tile_slider = L.control.range({
        position: 'topright',
        min: 0,
        max: 1,
        value: 1,
        step: 0.05,
        orient: 'vertical',
        icon: false
    });
    tile_slider.on('input change', function(e) {
        tile_layers.forEach(function (layer) {
            layer.setOpacity(e.value);
        });
    });
    map.addControl(tile_slider);
    
    // ocean slider
    var ocean_slider = L.control.range({
        position: 'topright',
        min: 0,
        max: 1,
        value: 1,
        step: 0.05,
        orient: 'vertical',
        icon: false
    });
    ocean_slider.on('input change', function(e) {
        ocean_layer.setOpacity(e.value);
    });
    map.addControl(ocean_slider);
}