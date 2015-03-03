var $ = require('jquery');

var bootstrap = require('bootstrap')

$(".js-mission-complete").click(function(event) {
    var id = $(this).attr("data-tr");
    $.ajax({
        url: '/mission/' + $(this).attr("data-id"),
        type: 'put',
        data: {status: 'complete'},
    })
    .done(function() {
        console.log("success");
        $("#"+id).fadeOut("normal", function() {
            $(this).remove();
        })
    })
});

$("#reset").click(function(event) {
    /* Act on the event */
    $(".js-mission-complete").click();
});