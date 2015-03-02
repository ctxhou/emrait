var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Marionette = require('backbone.marionette');
var bootstrap = require('bootstrap');
var ShelterView = require('./views/shelter/shelter_modal');
var ShelterResultView = require('./views/shelter/shelter_result');
var Ambulance = require('./models/ambulance');
var Shelters = require('./collections/shelter');
var bootstrap = require('bootstrap')
var Spinner = require('spin')
var app = new Marionette.Application();
app.addRegions({
    content: "#content"
})

app.on("before:start", function() {
    var disaster_lat = $("#lat").val();
    var disaster_lng = $("#lng").val();
    var shelters = new Shelters();
    var opts = {
      lines: 13, // The number of lines to draw
      length: 20, // The length of each line
      width: 10, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9 // The z-index (defaults to 2000000000)
    };
    var target = document.getElementById('spin');
    var spinner = new Spinner(opts).spin(target);
    shelters.fetch({
        success: function() {
            var shelterResultView = new ShelterResultView({collection: shelters});
            app.content.show(shelterResultView);
        }
    })

    // $(".js-shelter").click(function(event) {
        // var shelter_lat = $(this).attr("data-lat");
        // var shelter_lng = $(this).attr("data-lng");
        // var shelterView = new ShelterView({disaster_lat: disaster_lat, disaster_lng: disaster_lng, shelter_lat: shelter_lat, shelter_lng: shelter_lng})
        // app.modal.show(shelterView)
    // });
})
app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();