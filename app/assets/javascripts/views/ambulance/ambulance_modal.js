var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/ambulance/ambulance_modal.hbs');
Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({
    template: templates,

    initialize: function(options) {
        this.id = options.id
    },

    events: {
        "click #submit": "submit"
    },

    submit: function() {
        var assign = $("#assign").val();
        var lat = $("#end_lat").val();
        var lng = $("#end_lng").val();
        $.ajax({
            url: "/ambulance/"+ this.id,
            type: 'put',
            data: {exist: assign, end_lat: lat, end_lng: lng},
        })
        .done(function() {
            alert("指派成功")
            location.reload()
        })
    }
});