function include(file) { 
    var script  = document.createElement('script'); 
    script.src  = file; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    document.getElementsByTagName('head').item(0).appendChild(script); 
} 

// 0: Mapbox 1: Satellite 2: OSM                            v
document.getElementsByClassName("layer-switch")[0].children[1].click();

// scripts to load
include("../range.js");
include("../grid.js");
include("../fingerprint.js")
include("../hide.js");
include("../image.js");
include("../export.js");