require 'open-uri'
require "addressable/uri"

class HomeController < ApplicationController
    def index
        uri = "http://140.116.96.118:9000/new.json"
        @json = JSON.load(open(uri))
    end

    def clinic

    end

    def shelter
        api_key = "54ce0b394abca63f6426bd97"
        uri = "http://www.datagarage.io/api/#{api_key}"
        @json = JSON.load(open(uri))
    end

    def clinic_search
        @address = params[:address]
        @lat = params[:lat]
        @lng = params[:lng]
        unless @address.length == 0
          @address = Geocoder.coordinates(@address)
          @lat = @address[0]
          @lng = @address[1]
        end
        @subject = ["不分科", "內科", "兒科", "家醫科", "復健科", "眼科", "牙科", "精神科", "皮膚科", "耳鼻喉科", "婦產科", "外科", "口腔顎面外科", "中醫科", "骨科", "神經科", "整形外科", "神經外科", "泌尿科", "病理科", "急診醫學科", "麻醉科", "放射線科", "洗腎科", "齒顎矯正科", "不分科"]
    end

    def get_clinic
        center_point = [params[:lng], params[:lat]]
        distance = 1.5 #km
        box = Geocoder::Calculations.bounding_box(center_point, distance)
        selector = Addressable::URI.parse("selector=緯度>=#{box[0]}AND緯度<=#{box[2]}AND經度>=#{box[1]}AND經度<=#{box[3]}").normalize.to_str
        api_key = "54d3420c4abca63f6426cd35"
        uri = "http://www.datagarage.io/api/#{api_key}?#{selector}"
        @json = JSON.load(open(uri))
        render json: @json
    end
end
