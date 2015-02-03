var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var basic_model = require('../models/basic_model');

module.exports = Backbone.Collection.extend({
    model: basic_model,

    initialize: function(options) {
        if (options){
            this.lng = options.location[0] 
            this.lat = options.location[1]
        }
        this.sort_key = 'distance';
    },

    url: function() {
        return "/clinic/" + this.lng + "/" + this.lat
    },

    comparator: function(a, b) {
        a = a.get(this.sort_key);
        b = b.get(this.sort_key);
        return a > b ?  1
             : a < b ? -1
             :          0;
    },

    sort_by_id: function() {
        this.sort_key = 'id';
        this.sort();
    }
});