var $ = require('jquery');
var _ = require('underscore');
var GetGeo = require('./module/get_geo')
var geocode = _.template('<div class="col-md-2">'+
                    '<input type="text" class="form-control" placeholder="緯度" name="lat" id="lat" required>'+
                '</div>'+'<div class="col-md-2">'+
                '<input type="text" class="form-control" placeholder="經度" name="lng" id="lng" required></div>'+
                '<div class="col-md-2">'+
                '<a class="btn btn-default" id="get_geo">自動定位</a></div>'
                )
var location = _.template('<div class="col-md-10" id="location">'+
                '<input type="text" class="form-control" name="address" placeholder="輸入所在地址" required id="address">'+
                '<input type="hidden" name="lat" id="lat" required>'+
                '<input type="hidden" name="lng" id="lng" required>'+
                '</div>')

var fill_geocode = function(ary) {
    $("#lat").val(ary[0])
    $("#lng").val(ary[1])
    if ($("#lat").val()){
        $("#submit").removeAttr('disabled')
    }
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

$("#address").change(function() {
    var google_url = "http://maps.googleapis.com/maps/api/geocode/json?address="
    var val = $(this).val();
    $.get(google_url + val, function(data) {
        /*optional stuff to do after success */
        if (data.results[0]) {
            var geo = data.results[0].geometry.location
            $("#lat").val(geo.lat)
            $("#lng").val(geo.lng)
            $("#msg").html("正確的地址！")
            $("#submit").removeAttr('disabled')
        } else {
            $("#msg").html("你輸入錯誤的地址...")
            $("#submit").attr('disabled', "disabled")
        }
    });
})

