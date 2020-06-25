function include(file) { 
    var script  = document.createElement('script'); 
    script.src  = file; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    document.getElementsByTagName('head').item(0).appendChild(script); 
} 

// set map type
document.getElementsByClassName("layer-switch")[0].children[1].click();

// scripts to load
include("../fingerprint.js")
include("../hash.js");
include("../hide.js");
include("../image.js");
include("../export.js");