var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/clinic/clinic_list.hbs');
Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({
    template: templates,

    initialize: function(options) {
        this.geo_ary = options.geo_ary;
        this.map = options.map;
        this.collection.bind('reset', this.render, this);
        // this.model.bind('reset', this.render);
    },

    events: {
        "click .js-clinic-location": "click_location"
    },

    templateHelpers: function() {
        return {
            lat: this.geo_ary[0],
            lng: this.geo_ary[1]
        }
    },

    click_location: function(e) {
        var id = $(e.currentTarget).attr("data-name");
        m = this.map.data('tinyMap');
        markers = m._markers;
        var position;
        for(var i = 0; i < markers.length; i +=1) {
            marker = markers[i];
            marker.infoWindow.close();
            if (id === marker.id) {        
                marker.infoWindow.open(m.map, marker);
                m.map.panTo(marker.position);
                position = marker.position
            }
        }
        this.map.tinyMap('clear', 'direction');
        this.map.tinyMap('modify', {
            direction: [
                {
                    'from': [this.geo_ary[0], this.geo_ary[1]],
                    'to': [position.k, position.D]
                }
            ]
        });
    }
});