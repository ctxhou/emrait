var $ = require('jquery');
var bootstrap = require('bootstrap');
module.exports = {
    init: function() {
        var content = $("#info_content").html();

        $('#shelter_info').popover({
            title: function() {
                return $("#popover-head").html();
            },
            content: function() {
                return $("#popover-content").html();
            },
            html: true,
            trigger: 'click'
        })
    }
}