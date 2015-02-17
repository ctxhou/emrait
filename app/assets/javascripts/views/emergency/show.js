var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var templates = require('../../templates/emergency/show.hbs');
var helper = require('../../templates/helper/index');
Backbone.$ = $;

module.exports = Backbone.Marionette.ItemView.extend({
    template: templates,

    events: {
        "click .js-add": "add_ambulance",
        "click .js-minus": "less_ambulance",
        "click #assign-submit": "assign"
    },

    initialize: function() {
        this.total = 0
    },

    add_ambulance: function(e) {
        var $target = $(e.currentTarget);
        var id = $target.attr("data-id");
        var now = $("#"+id).text();
        var max = $("#"+id).attr("data-max");
        if (now < max) {
            $("#"+id).text(parseInt(now)+1)     
            this.total += 1
            $("#total").text(this.total)
        }
    },

    less_ambulance: function(e) {
        var $target = $(e.currentTarget);
        var id = $target.attr("data-id");
        var now = $("#"+id).text();
        if (parseInt(now) > 0) {
            $("#"+id).text(parseInt(now)-1) 
            this.total -= 1
            $("#total").text(this.total)           
        }
    },

    assign: function() {
        var json = {}
        json["assign"] = []
        $(".js-assign").each(function(i, obj) {
            var val = $(this).text();
            if (parseInt(val) != 0){
                var id = $(this).attr('id');
                var ambulance_id = $(this).attr('data-id');
                var disaster = $(this).attr("data-disaster")
                var lat = $("#lat"+disaster).val();
                var lng = $("#lng"+disaster).val();
                var hospital = $('input[name="send_hospital_'+id+'"]:checked').val();
                json["assign"].push({exist: val, id: ambulance_id, end_lat: lat, end_lng: lng, hospital: hospital})
            }
        })
        json = JSON.stringify(json)
        console.log(json)
        $.ajax({
            url: "/assign_mission",
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: json
        })
        .done(function() {
            alert("指派成功")
            location.replace("/mission")
        })
    }
});