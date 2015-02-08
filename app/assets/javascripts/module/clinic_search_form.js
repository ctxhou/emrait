var $ = require('jquery');

module.exports = {
    init: function() {
        $("#address").change(function() {
            var google_url = "http://maps.googleapis.com/maps/api/geocode/json?address="
            var val = $(this).val();
            $.get(google_url + val, function(data) {
                if (data.results[0]) {
                    var geo = data.results[0].geometry.location
                    $("#lat").val(geo.lat)
                    $("#lng").val(geo.lng)
                    $("#address-msg").html("正確的地址！")
                    $("#submit").removeAttr('disabled')
                } else {
                    $("#address-msg").html("你輸入錯誤的地址...")
                    $("#submit").attr('disabled', "disabled")
                }
            });
        })
    }
}
