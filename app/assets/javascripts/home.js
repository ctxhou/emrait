var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Handlebars = require('handlebars')
var bootstrap = require('bootstrap')
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var GetGeo = require('./module/get_geo')
var geocode = _.template('<div class="col-md-3">'+
                    '<input type="text" class="form-control" placeholder="緯度" name="lat<%=number%>" id="lat<%=number%>" required>'+
                '</div>'+'<div class="col-md-3">'+
                '<input type="text" class="form-control" placeholder="經度" name="lng<%=number%>" id="lng<%=number%>" required></div>'+
                '<div class="col-md-2">'+
                '<a class="btn btn-default" id="get_geo<%=number%>" data-loading-text="定位中..." class="btn btn-primary" autocomplete="off">自動定位</a></div>'
                )
var location = _.template('<div class="col-md-6" id="location">'+
                '<input type="text" class="form-control js-address" name="address<%=number%>" placeholder="輸入所在地址" data-number="<%=number%>" required>'+
                '<input type="hidden" name="lat<%=number%>" id="lat<%=number%>" required>'+
                '<input type="hidden" name="lng<%=number%>" id="lng<%=number%>" required>'+
                '</div>')

function getRandom(min, max) {
  return Math.round((Math.random() * (max - min) + min));
}
var app = new Marionette.Application();
app.addRegions({
    modal: "#modal-view"
})

app.on("before:start", function() {
    var that = this;
    var count = 1;
    var template = Handlebars.compile($("#multi-disaster").html())
    $(document).on('change', '.js-location-select', function(event) {
        var number = $(this).attr("data-number")
        if ($(event.currentTarget).val()=="location") {
            $("#location-input-"+number).html(location({number: number}));
        } else {
            $("#location-input-"+number).html(geocode({number: number}));
            $("#get_geo"+number).click(function(event) {
                GetGeo.geolocation_multi(that.fill_geocode, number)
            });
        }
    });
    $(".js-remove").hide();
    $(document).on("click", ".js-new", function(){
        count += 1;
        $("#length").val(parseInt($("#length").val())+1)
        var html = template({number: count, rand:getRandom(2, 100000)})
        $("#multi").append(html)
        if (count == 1) {
            $(".js-remove").hide();
        } else {
            $(".js-remove").show();
        }
    })
    $(document).on('click', '.js-remove', function(event) {
        $target = $(event.currentTarget);
        count -= 1;
        $("#length").val(parseInt($("#length").val())-1)
        var disaster = $target.attr("data-disaster")
        $("#"+disaster).remove();
        $(".js-disaster-name").each(function(e) {
            var count = (e+1).toString()
            $(this).text("災點"+count)
        })
        if (count == 1) {
            $(".js-remove").hide();
        } else {
            $(".js-remove").show();
        }
    });

    $(document).on('change', ".js-address", function() {
        var google_url = "http://maps.googleapis.com/maps/api/geocode/json?address="
        var val = $(this).val();
        var number = $(this).attr("data-number")
        $.get(google_url + val, function(data) {
            /*optional stuff to do after success */
            if (data.results[0]) {
                var geo = data.results[0].geometry.location
                $("#lat"+number).val(geo.lat)
                $("#lng"+number).val(geo.lng)
                $("#msg"+number).html("正確的地址！")
                $("#submit").removeAttr('disabled')
            } else {
                $("#msg"+number).html("你輸入錯誤的地址...")
                $("#submit").attr('disabled', "disabled")
            }
        });
    })
})


app.fill_geocode = function(ary, number) {
    $("#lat"+number).val(ary[0])
    $("#lng"+number).val(ary[1])
    if ($("#lat"+number).val()){
        $("#submit").removeAttr('disabled')
    }
}

app.on("initialize:after", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

app.start();

