// get and save data
function export_map() {
    let geojson = window.api.data.get('map');
    if (geojson.features.length == 0)
        return;

    // unique identifier
    Fingerprint2.get(function (components) {
        let values = components.map(function (component) { return component.value })
        let hash = Fingerprint2.x64hash128(values.join(''), 31)
        geojson.uid = hash;
        console.log(geojson.uid);

        // get url to export to
        var export_url = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
                export_url = JSON.parse(xmlhttp.responseText).export_url;

                // post json to url
                var xhr = new XMLHttpRequest();
                xhr.open("POST", export_url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(geojson));
            }
        };
        xmlhttp.open("GET","../config.json",true);
        xmlhttp.send();
    });
}


// for uid compression
function hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}

// export on window unload
window.addEventListener("beforeunload", export_map);