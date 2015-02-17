var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var basic_model = require('../models/basic_model');

module.exports = Backbone.Collection.extend({
    
    model: basic_model,

    url: "/near_ambulance?" + window.location.search.substring(1)
});