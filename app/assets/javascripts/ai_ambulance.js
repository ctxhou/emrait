var $ = require('jquery');
require('./vendor/jQclock.min')

var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var Marionette = require('backbone.marionette');
var bootstrap = require('bootstrap');
var AmbulanceView = require('./views/ambulance/ambulance_modal');
var Ambulance = require('./models/ambulance');
var Hospital = require('./models/hospital');

var app = new Marionette.Application();
app.addRegions({
    modal: "#modal-view"
})

app.on("before:start", function() {
    $(".time").each(function() {
        var time_stamp = $(this).text()
        $(this).clock({"timestamp": time_stamp, "calendar":"false"})
    })

    $(".js-ambulance").click(function(event) {
        var $target = $(event.currentTarget);
        var id = $target.attr("data-id");
        var hos_id = $target.attr("data-hos-id")
        var ambulance = new Ambulance({id: id});
        var hospitals = new Hospital({id: hos_id});
        hospitals.fetch({
            success: function() {
                ambulance.fetch({
                    success: function() {
                        var ambulanceView = new AmbulanceView({model: ambulance, id: id, hospital: hospitals})
                        app.modal.show(ambulanceView)
                    }
                })
            }
        }); // set the near hospital data

    });

    $("#assign-submit").click(function(event) {
        var json = {}
        json["assign"] = []
        $(".js-assign").each(function(i, obj) {
            // var val = $(this).attr("data-name");
            var id = $(this).attr('data-id');
            var structure = $(this).attr("data-name");
            var hospital = $(this).attr('data-hospital');
            var lat = $(this).attr('data-lat');
            var lng = $(this).attr('data-lng');
            var rand_id = $(this).attr('data-rand')
            var dis_time = $("#dis_time_"+rand_id+" .clocktime").text();
            var hos_time = $("#hos_time_"+rand_id+" .clocktime").text();
            json["assign"].push({dis_time:dis_time, hos_time:hos_time, name: structure, exist: 1, id: id, end_lat: lat, end_lng: lng, hospital: hospital})
        })
        json = JSON.stringify(json)
        $.ajax({
            url: "/assign_mission",
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: json
        })
        .done(function() {
            alert("指派成功")
            location.replace("/mission")
        })
    });
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();