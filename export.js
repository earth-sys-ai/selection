// get and save data
function export_map() {
    let geojson = window.api.data.get('map').features;
    if (geojson.length == 0)
        return null;

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
}

// export on window unload
window.addEventListener("unload", export_map);