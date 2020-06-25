// right menu
document.getElementsByClassName("collapse-button")[0].click();
del_class("right");

// left menu
del_class("file-bar");

// tool select
del_class("leaflet-draw-draw-rectangle");
del_class("leaflet-draw-draw-marker");
del_class("leaflet-draw-draw-polyline");

// about
del_class("leaflet-control-attribution");

// background select
del_class("layer-switch");

// delete all elements in class
function del_class(name) {
    var list = document.getElementsByClassName(name);
    for(var i = list.length - 1; 0 <= i; i--)
        if(list[i] && list[i].parentElement)
            list[i].parentElement.removeChild(list[i]);
}