var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Marionette = require('backbone.marionette');
var bootstrap = require('bootstrap');
var ShelterView = require('./views/shelter/shelter_modal');
var Ambulance = require('./models/ambulance');

var app = new Marionette.Application();
app.addRegions({
    modal: "#modal-view"
})

app.on("before:start", function() {
    
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();