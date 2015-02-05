var $ = require('jquery');

var geo = {
    geolocation: function(cb) {
        var msg = document.getElementById("msg");
        var that = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude,
                    lng = position.coords.longitude,
                    latlng = [lat, lng].join(",");
                var city_url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng+"&sensor=true_or_false"
                $.get(city_url, function(data) {
                    var city_name = data.results[0].address_components[5].long_name
                    cb.call(that, [lat, lng, city_name]);
                });
            })
        } else {
            msg.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
}

module.exports = geo