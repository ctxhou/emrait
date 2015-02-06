var $ = require('jquery');
var _ = require('underscore');
var GetGeo = require('./module/get_geo')
var geocode = _.template('<div class="col-md-2">'+
                    '<input type="text" class="form-control" placeholder="緯度" name="lat" id="lat">'+
                '</div>'+'<div class="col-md-2">'+
                '<input type="text" class="form-control" placeholder="經度" name="lng" id="lng"></div>'+
                '<div class="col-md-2">'+
                '<i class="fa fa-location-arrow geo_icon" id="get_geo"></i>'+'</div><div id="msg" class="col-md-4"></div>'
                )
var location = _.template('<div class="col-md-10" id="location">'+
                '<input type="text" class="form-control" name="address" placeholder="輸入所在地址"></div>')

var fill_geocode = function(ary) {
    $("#lat").val(ary[0])
    $("#lng").val(ary[1])
}

$("#location-select").change(function(event) {
    if ($(event.currentTarget).val()=="location") {
        $("#location-input").html(location());
    } else {
        $("#location-input").html(geocode());
        $("#get_geo").click(function(event) {
            GetGeo.geolocation(fill_geocode)
        });
    }
});


