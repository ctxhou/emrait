var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/ambulance/ambulance_modal.hbs');
require("../../vendor/jquery.tinyMap-3.1.3.min")

Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({

    template: templates,

    onShow: function() {
        var start_lat = this.model.get("lat")
        var start_lng = this.model.get("lng")
        var end_lat = $("#end_lat").val()
        var end_lng = $("#end_lng").val()

        var map = $("#map").tinyMap({
            zoom: 15,
            center: [start_lat, start_lng],
            direction: [
                {
                    'from': [start_lat, start_lng],
                    'to': [end_lat, end_lng]
                }
            ]
        })
    }
});