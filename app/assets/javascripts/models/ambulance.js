var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;


module.exports = Backbone.Model.extend({
    
    urlRoot: "/ambulance/",

    idAttribute: "id"

});