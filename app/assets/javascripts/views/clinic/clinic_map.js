var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/clinic/clinic_list.hbs');
Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
        this.data = options.clinics;
        this.geo = options.geo
        this.show_map(options.map);
    },

    show_map: function(map) {
        this.data.push({id: "current", addr: [this.geo[0], this.geo[1]],'text': '<strong>目前位置</strong>', 'icon': 'http://i.imgur.com/mx7VyAx.png', 'label': '目前位置', 'css': 'current_location'})
        map.tinyMap('modify', { 
            marker: this.data
        })
    }
});

