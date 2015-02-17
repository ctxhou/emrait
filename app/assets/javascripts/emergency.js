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
    content: "#content",
    modal: "#modal-view"
})

app.on("before:start", function() {
    var emergencies = new Emergencies();
    var hospitals = new Hospitals();
    hospitals.fetch({
        success: function() {
            hospitals = hospitals.toJSON();
        }
    }); // fetch the near hospital data
    emergencies.fetch({
        success: function() {
            var emergencyView = new EmergencyView({collection: emergencies});
            app.content.show(emergencyView);
        }
    })
    var lat = $("#end_lat").val();
    var lng = $("#end_lng").val();
    $(document).on("click", ".js-ambulance", function(event) {
        var $target = $(event.currentTarget);
        var id = $target.attr("data-id");
        var ambulance = new Ambulance({id: id})
        var disaster_id = $target.attr("data-disaster");
        var tmp_hos = hospitals[0][disaster_id]
        ambulance.fetch({
            success: function() {
                var ambulanceView = new AmbulanceView({disaster_id: disaster_id, model: ambulance, id: id, hospital: tmp_hos})
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
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();