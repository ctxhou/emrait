var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/shelter/shelter_list.hbs');
Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({
    template: templates
});