var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/shelter/shelter_result.hbs');
Backbone.$ = $;
require("../../vendor/jquery.tinyMap-3.1.3.min")


module.exports = Backbone.Marionette.ItemView.extend({

    template: templates,

    initialize: function(options) {
        var that = this;
        this.lat = $("#lat").val();
        this.lng = $("#lng").val();
        var tmp = options.collection.toJSON();
        this.data = [];
        this.data.push({id: "current", addr: [this.lat, this.lng],'text': '<strong>目前位置</strong>', 'icon': 'http://app.essoduke.org/tinyMap/4.png', 'label': '目前位置', 'css': 'current_location'})
        $.each(tmp, function(index, val) {
            var show_text = "<h4>"+val["name"]+"</h4>"+val["city"]+val["address"];
            that.data.push({addr:[val["lat"], val["lng"]], text: show_text })
        });
    },

    onShow: function() {
        $('[data-toggle="tooltip"]').tooltip()
        this.map = $("#gmap").tinyMap({
            zoom: 15,
            center: {lat:this.lat, lng:this.lng},
            marker: this.data
        })
    },

    events: {
        "click .js-route": "route"
    },

    route: function(e) {
        $target = $(e.currentTarget);
        var disaster_lat = $target.attr("data-lat");
        var disaster_lng = $target.attr("data-lng");
        var id = $(e.currentTarget).attr("data-name");
        m = this.map.data('tinyMap');
        // markers = m._markers;
        // var position;
        // for(var i = 0; i < markers.length; i +=1) {
        //     marker = markers[i];
        //     marker.infoWindow.close();
        //     if (id === marker.id) {        
        //         marker.infoWindow.open(m.map, marker);
        //         m.map.panTo(marker.position);
        //         position = marker.position
        //     }
        // }
        this.map.tinyMap('clear', 'direction');
        this.map.tinyMap('modify', {
            direction: [
                {
                    'from': [this.lat, this.lng],
                    // 'to': [position.k, position.D]
                    'to': [disaster_lat, disaster_lng]
                }
            ]
        });
    }
});