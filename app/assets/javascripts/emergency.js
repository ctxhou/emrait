var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Marionette = require('backbone.marionette');
var bootstrap = require('bootstrap');
var AmbulanceView = require('./views/ambulance/ambulance_modal');
var Ambulance = require('./models/ambulance');

var app = new Marionette.Application();
app.addRegions({
    modal: "#modal-view"
})

app.on("before:start", function() {
    $(".js-ambulance").click(function(event) {
        var $target = $(event.currentTarget);
        var id = $target.attr("data-id");
        var ambulance = new Ambulance({id: id})

        ambulance.fetch({
            success: function() {
                var ambulanceView = new AmbulanceView({model: ambulance, id: id})
                app.modal.show(ambulanceView)
            }
        })
    });
    var lat = $("#end_lat").val();
    var lng = $("#end_lng").val();
    $("#assign-submit").click(function(event) {
        var json = {}
        json["assign"] = []
        $(".js-assign").each(function(i, obj) {
            var val = $(this).val();
            var id = $(this).attr("data-id");
            json["assign"].push({exist: val, id: id, end_lat: lat, end_lng: lng})
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
            location.reload()
        })
    });
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();