var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/shelter/shelter_modal.hbs');
require("../../vendor/jquery.tinyMap-3.1.3.min")

Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({

    template: templates,

    initialize: function(options) {
        this.disaster_lat = options.disaster_lat
        this.disaster_lng = options.disaster_lng
        this.shelter_lat = options.shelter_lat
        this.shelter_lng = options.shelter_lng
    },

    onShow: function() {
        this.map = $("#map").tinyMap({
            zoom: 15,
            center: [this.disaster_lat, this.disaster_lng],
            direction: [
                {
                    'from': [this.disaster_lat, this.disaster_lng],
                    'to': [this.shelter_lat, this.shelter_lng]
                }
            ]
        })
    }
});