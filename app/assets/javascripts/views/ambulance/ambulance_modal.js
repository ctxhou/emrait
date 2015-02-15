var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/ambulance/ambulance_modal.hbs');
require("../../vendor/jquery.tinyMap-3.1.3.min")

Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({

    template: templates,

    events: {
        "click .js-hospital": "hospital_route"
    },

    initialize: function(options) {
        this.hospital = options.hospital.toJSON();
        delete this.hospital["id"]
        this.start_lat = this.model.get("lat")
        this.start_lng = this.model.get("lng")
        this.end_lat = $("#end_lat").val()
        this.end_lng = $("#end_lng").val()
    },

    templateHelpers: function() {
        return {hospital: this.hospital}
    },

    onShow: function() {
        this.map = $("#map").tinyMap({
            zoom: 15,
            center: [this.end_lat, this.end_lng],
            direction: [
                {
                    'from': [this.start_lat, this.start_lng],
                    'to': [this.end_lat, this.end_lng]
                }
            ]
        })
    },

    hospital_route: function(e) {
        $(".js-hospital").removeClass('active')
        var $target = $(e.currentTarget);
        $target.addClass('active')
        var lat = $target.attr("data-lat");
        var lng = $target.attr("data-lng");
        $("#hospital-route").text("再到"+$target.text()+"(C)")
        this.map.tinyMap('clear', 'direction')
        this.map.tinyMap('modify', {
            direction: [
                {
                    'from': [this.start_lat, this.start_lng],
                    'waypoint': [
                        [this.end_lat, this.end_lng]
                    ],
                    'to': [lat, lng]
                }
            ]
        })
    }
});