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
require("./vendor/jquery.tinyMap.min")
require("./vendor/readmore.min")

var app = new Marionette.Application();
app.addRegions({
    modal: "#modal-view"
})

app.on("before:start", function() {
    var lat = $("#lat1").val();
    var lng = $("#lng1").val();
    $.getJSON('/ai_direction?'+ window.location.search.substring(1), function(json, textStatus) {
        console.log(json)
        var map = $("#gmap").tinyMap({
            zoom: 15,
            center: {lat:lat, lng:lng},
            direction: json,
            interval: 10000
        })
        $(".js-panto").click(function(event) {
            $target = $(event.currentTarget)
            $("#gmap").tinyMap('panto', $target.attr("data-geo"))
        });
    });
    $('#readmore').readmore({
      speed: 75,
      collapsedHeight: 0,
      moreLink: '<a href="#" style="font-size:19px">詳細指派清單</a>',
      lessLink: '<a href="#">Read less</a>'
    });
    $('[data-toggle="popover"]').popover({
        "html": true
    })
    $(".time").each(function() {
        var time_stamp = $(this).text()
        $(this).clock({"timestamp": time_stamp, "calendar":"false"})
    })
    $("#reset").click(function() {
        var speed = $("#speed").val();
        var setup = $("#setup").val();
        var url = $("#this_url").val();
        window.location.href = url+"&speed="+speed+"&setup="+setup
    })
    $(".js-ambulance").click(function(event) {
        var $target = $(event.currentTarget);
        var id = $target.attr("data-id");
        var hos_id = $target.attr("data-hos-id")
        var ambulance = new Ambulance({id: id});
        var hospitals = new Hospital({id: hos_id});
        var disaster_id = $target.attr("data-disaster")
        hospitals.fetch({
            success: function() {
                hospitals = hospitals.toJSON();
                ambulance.fetch({
                    success: function() {
                        var ambulanceView = new AmbulanceView({disaster_id: disaster_id, model: ambulance, id: id, hospital: hospitals})
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