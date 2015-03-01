var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Marionette = require('backbone.marionette');
var bootstrap = require('bootstrap');
var ShelterView = require('./views/shelter/shelter_modal');
var Ambulance = require('./models/ambulance');
var bootstrap = require('bootstrap')
var app = new Marionette.Application();
app.addRegions({
    modal: "#modal-view"
})

app.on("before:start", function() {
    $('[data-toggle="tooltip"]').tooltip()
    var disaster_lat = $("#lat").val();
    var disaster_lng = $("#lng").val();

    $(".js-shelter").click(function(event) {
        var shelter_lat = $(this).attr("data-lat");
        var shelter_lng = $(this).attr("data-lng");
        var shelterView = new ShelterView({disaster_lat: disaster_lat, disaster_lng: disaster_lng, shelter_lat: shelter_lat, shelter_lng: shelter_lng})
        app.modal.show(shelterView)
    });
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();