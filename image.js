var map = window.api.map;
map.panTo(new L.latLng(28.40, -96.69));
map.setZoom(7);

// tile ids from config
var tile_ids = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
        tile_ids = JSON.parse(xmlhttp.responseText).tile_ids;

            // add all tiles to map
            tile_ids.forEach(function (tile) {
            map.addLayer(L.tileLayer('https://stormscdn.ngs.noaa.gov/' + tile + '/{z}/{x}/{y}'));
            });
    }
};
xmlhttp.open("GET","../config.json",true);
xmlhttp.send();


