var $ = require('jquery');

var bootstrap = require('bootstrap')

$(".js-mission-complete").click(function(event) {
    $.ajax({
        url: '/mission/' + $(this).attr("data-id"),
        type: 'put',
        data: {status: 'complete'},
    })
    .done(function() {
        console.log("success");
    })
});