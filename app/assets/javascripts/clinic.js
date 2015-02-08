var $ = require('jquery');
var GetGeo = require('./module/get_geo')
var SearchForm = require('./module/clinic_search_form')


SearchForm.init();


$("#get_geo").click(function() {
    $("#address-msg").html("定位中....")
    GetGeo.geolocation(setCoor);
});

var setCoor = function(coor) {
    console.log(coor)
    $("#lat").val(coor[0]);
    $("#lng").val(coor[1]);
    $("#address-msg").empty();
    $("#address").attr("placeholder", "已定位你的位置")
    $("#address").prop("readonly", true)
    $("#submit").removeAttr('disabled')
}