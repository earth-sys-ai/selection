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
include("mod/range.js");
include("mod/grid.js");
include("mod/fingerprint.js")
include("mod/hide.js");
include("mod/image.js");
include("mod/export.js");