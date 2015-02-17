var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Marionette = require('backbone.marionette');
var bootstrap = require('bootstrap');
var AmbulanceView = require('./views/ambulance/ambulance_modal');
var Ambulance = require('./models/ambulance');
var Hospitals = require('./collections/hospital');
var Emergencies = require('./collections/emergencies');
var EmergencyView = require('./views/emergency/show');
var app = new Marionette.Application();
app.addRegions({
    content: "#content"
})

app.on("before:start", function() {
    var emergencies = new Emergencies();
    // var hospitals = new Hospitals();
    // hospitals.fetch(); // fetch the near hospital data
    emergencies.fetch({
        success: function() {
            var emergencyView = new EmergencyView({collection: emergencies});
            app.content.show(emergencyView);
        }
    })
    var lat = $("#end_lat").val();
    var lng = $("#end_lng").val();
    $(".js-ambulance").click(function(event) {
        var $target = $(event.currentTarget);
        var id = $target.attr("data-id");
        var ambulance = new Ambulance({id: id})

        ambulance.fetch({
            success: function() {
                var ambulanceView = new AmbulanceView({model: ambulance, id: id, hospital: hospitals})
                app.modal.show(ambulanceView)
            }
        })
    });

    $("#assign-submit").click(function(event) {
        var json = {}
        json["assign"] = []
        $(".js-assign").each(function(i, obj) {
            var val = $(this).text();
            var id = $(this).attr('id');
            var hospital = $('input[name="send_hospital_'+id+'"]:checked').val();
            json["assign"].push({exist: val, id: id, end_lat: lat, end_lng: lng, hospital: hospital})
        })
        json = JSON.stringify(json)
        console.log(json)
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
    var total = parseInt($("#total").text());
    $(".js-add").click(function(event) {
        var id = $(this).attr("data-id");
        var now = $("#"+id).text();
        var max = $("#"+id).attr("data-max");
        if (now < max) {
            $("#"+id).text(parseInt(now)+1)     
            total += 1 
            $("#total").text(total)
        }
    });
    $(".js-minus").click(function(event) {
        var id = $(this).attr("data-id");
        var now = $("#"+id).text();
        if (parseInt(now) > 0) {
            $("#"+id).text(parseInt(now)-1) 
            total -= 1
            $("#total").text(total)           
        }
    });
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();