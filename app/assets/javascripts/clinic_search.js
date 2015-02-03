var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Marionette = require('backbone.marionette');
var bootstrap = require('bootstrap')
// collection
var Clinics = require('./collections/clinic_location')
// view
var ClinicListView = require('./views/clinic/clinic_list')
var ClinicMapView = require('./views/clinic/clinic_map')

var GetGeo = require('./module/get_geo')
require("./vendor/jquery.tinyMap-3.1.3.min")

var clinic_app = new Marionette.Application();
var geo;
clinic_app.addRegions({
    list_area: "#list_area",
    map_area: "#gmap"
})

clinic_app.on("before:start", function() {
    var that = this;
    var geo = [$("#lat_val").val(), $("#lng_val").val()]
    var map = $("#gmap").tinyMap({
        zoom: 15,
        center: {lat:geo[0], lng:geo[1]}
    })
    this.initView(geo, map);
    $("#get_geo").click(function(event) {
        GetGeo.geolocation(that.setCoor);
    });
})

clinic_app.setCoor = function(coor) {
    console.log(coor)
    $("#lat").val(coor[0]);
    $("#lng").val(coor[1]);
    $("#address").attr("placeholder", "已定位你的位置")
    $("#address").prop("readonly", true)
}

clinic_app.initView = function(geo, map) {
    var that = this;
    var clinics = new Clinics({location: geo})
    clinics.fetch({
        success: function() {
            that.refactor_data(that.show_list, clinics, geo, map)
        }
    })
}

clinic_app.show_list = function(clinics, geo, map) {
    var new_clinics = new Clinics()
    new_clinics.reset(clinics)
    var clinicListView = new ClinicListView({collection: new_clinics, geo_ary: geo, map: map})
    this.list_area.show(clinicListView)
    var clinicMapView = new ClinicMapView({clinics: clinics, geo: geo, map: map})
}

clinic_app.click_location = function(map) {
    $(".js-clinic-location").click(function(event) {
        console.log(event)
        var id = $(event.currentTarget.val())
        console.log(id)
        m = map.data('tinyMap');
        markers = m._markers;
        for(i; i < markers.length; i +=1) {
            marker = markers[i];
            marker.infoWindow.close();
            console.log(marker)
            if (id === marker.id) {
                marker.infoWindow.open(m.map, marker);
                // 移動地圖
                m.map.panTo(marker.position);            
            }
        }
    });
}
// refactor data used to rename data and count distance
clinic_app.refactor_data = function(cb, clinics, geo, map) {
    var pos, clinics_add_distance = [], tmp_dis, obj;
    var now = new google.maps.LatLng(geo[0], geo[1])
    var clinics_json = clinics.toJSON();
    for(var i=0 ; i < clinics_json.length; i+=1) {
        pos = new google.maps.LatLng(clinics_json[i]["緯度"], clinics_json[i]["經度"]);
        tmp_dis = Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos, now));
        obj = clinics_json[i];
        var show_text = "<h3>"+obj["醫事機構名稱"]+"</h3>"+obj["地址"];
        clinics_add_distance.push({distance: tmp_dis,addr:[obj["緯度"], obj["經度"]], text: show_text, id: obj["醫事機構名稱"]})
    }
    // var nearest = distance.indexOf(Math.min.apply(Math, distance));
    cb.call(this, clinics_add_distance, geo, map)
}
clinic_app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

clinic_app.start();