var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var basic_model = require('../models/basic_model');

module.exports = Backbone.Collection.extend({
    
    model: basic_model,

    initialize: function(options){ 
        if (options){
            this.lng = options.lng; 
            this.lat = options.lat;
        }
    },

    url: function() {
        return "/hospital_distance?lat=" + this.lat + "&lng=" + this.lng
    }
});