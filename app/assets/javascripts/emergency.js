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
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();