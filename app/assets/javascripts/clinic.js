var $ = require('jquery');
var GetGeo = require('./module/get_geo')

$("#get_geo").click(function() {
    GetGeo.geolocation(setCoor);
});


var setCoor = function(coor) {
    console.log(coor)
    $("#lat").val(coor[0]);
    $("#lng").val(coor[1]);
    $("#address").attr("placeholder", "已定位你的位置")
    $("#address").prop("readonly", true)
}