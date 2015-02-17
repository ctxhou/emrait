var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/emergency/show.hbs');
var helper = require('../../templates/helper/index');
Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({
    template: templates
});