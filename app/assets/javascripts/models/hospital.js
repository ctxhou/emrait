var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;


module.exports = Backbone.Model.extend({

    initialize: function(options) {
        this.id = options.id
    },

    url: function() {
        return "/hospital/" + this.id
    }
});