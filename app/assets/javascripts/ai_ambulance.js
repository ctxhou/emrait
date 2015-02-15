var $ = require('jquery');
require('./vendor/jQclock.min')


$("#test").clock({"timestamp":$("#test").text()})
$(".time").each(function() {
    var time_stamp = $(this).text()
    $(this).clock({"timestamp": time_stamp, "calendar":"false"})
})