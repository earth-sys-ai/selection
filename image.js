var map = window.api.map;
map.panTo(new L.latLng(28.40, -96.69));
map.setZoom(7);

// tile ids from noaa cdn
var tile_ids = [
    '20170827-rgb',
    '20170828a-rgb',
    '20170828b-rgb',
    '20170829a-rgb',
    '20170829b-rgb',
    '20170830-rgb',
    '20170831a-rgb',
    '20170831b-rgb',
    '20170901a-rgb',
    '20170901b-rgb',
    '20170901c-rgb',
    '20170902a-rgb',
    '20170902b-rgb',
    '20170902c-rgb',
    '20170903a-rgb'
];

// add all tiles to map
tile_ids.forEach(function (tile) {
    map.addLayer(L.tileLayer('https://stormscdn.ngs.noaa.gov/' + tile + '/{z}/{x}/{y}'));
});