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
    // this.show_custom_list(clinics, geo, map);
    var that = this;
    var subject = []
    $(".js-subject").click(function(e) {
        var $target = $(e.currentTarget)
        if ($target.hasClass('active')) {
            $target.removeClass('active');
            subject = _.without(subject, $target.text())
        } else {
            $target.addClass('active')
            subject.push($target.text());
        }
        var filterApps = new_clinics.filter(function(model) {
            return _.some(model.attributes, function(val, attr) {
                if (jQuery.inArray( attr, subject ) != -1) {
                    return ~val.indexOf("T")                        
                }
            })
        })
        var search_clinic = new Clinics();
        search_clinic.reset(filterApps);
        var clinicListView = new ClinicListView({collection: search_clinic, geo_ary: geo, map: map})
        that.list_area.show(clinicListView)
        var json_filter = search_clinic.toJSON();
        map.tinyMap('clear', 'marker')
        new ClinicMapView({clinics: json_filter, geo: geo, map: map})
    })

}
 
var subejct_button = _.template("<button class='btn btn-default js-subject' ><%= sub %></button>")
// refactor data used to rename data and count distance
clinic_app.refactor_data = function(cb, clinics, geo, map) {
    var pos, clinics_add_distance = [], tmp_dis, obj;
    var now = new google.maps.LatLng(geo[0], geo[1])
    var clinics_json = clinics.toJSON();
    var subject_header = ["不分科", "內科", "兒科", "家醫科", "復健科", "眼科", "牙科", "精神科", "皮膚科", "耳鼻喉科", "婦產科", "外科", "口腔顎面外科", "中醫科", "骨科", "神經科", "整形外科", "神經外科", "泌尿科", "病理科", "急診醫學科", "麻醉科", "放射線科", "洗腎科", "齒顎矯正科", "不分科"]
    var subject = []
    var that = this;
    for(var i=0 ; i < clinics_json.length; i+=1) {
        pos = new google.maps.LatLng(clinics_json[i]["緯度"], clinics_json[i]["經度"]);
        tmp_dis = Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos, now));
        obj = clinics_json[i];
        var show_text = "<h4>"+obj["醫事機構名稱"]+"</h4>"+obj["地址"]+"<br>"+obj["電話"] + that.open_time(obj["看診時段"]);
        var input_obj = {distance: tmp_dis,addr:[obj["緯度"], obj["經度"]], text: show_text, id: obj["醫事機構名稱"]};
        $.each(subject_header, function(index, val) {
            input_obj[val] = clinics_json[i][val]                
            if (clinics_json[i][val] == "T"){
                subject.push(val)
            }
        });
        clinics_add_distance.push(input_obj)
    }
    // var nearest = distance.indexOf(Math.min.apply(Math, distance));
    subject = _.uniq(subject)
    // show subject button
    $.each(subject, function(index, val) {
        $("#subject_button").append(subejct_button({sub: val}))
    });
    cb.call(this, clinics_add_distance, geo, map)
}
clinic_app.open_time = function(time) {
    if (time == "false") {
        return ""
    }
    var time = time.split("-");
    var morning = ["早"]
    var evening = ["下"]
    var night = ["晚"]
    $.each(time, function(index, val) {
        var new_val = val.split("")
        morning.push(new_val[0])
        evening.push(new_val[1])
        night.push(new_val[2])
    });
    var inner = "<table class='table table-bordered'><tr><th></th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr><tr>"

    $.each(morning, function(index, val) {
        if (val == "1") {
            inner += "<td>O</td>"
        } else if (val == "0") {
            inner += "<td>X</td>"
        } else {
            inner += "<td>"+val+"</td>"
        }
    })
    inner += "</tr><tr>"
    $.each(evening, function(index, val) {
        if (val == "1") {
            inner += "<td>O</td>"
        } else if (val == "0") {
            inner += "<td>X</td>"
        } else {
            inner += "<td>"+val+"</td>"
        }
    })
    inner += "</tr><tr>"
    $.each(night, function(index, val) {
        if (val == "1") {
            inner += "<td>O</td>"
        } else if (val == "0") {
            inner += "<td>X</td>"
        } else {
            inner += "<td>"+val+"</td>"
        }
    })
    inner += "</tr></table>"
    return inner
}
clinic_app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

clinic_app.start();