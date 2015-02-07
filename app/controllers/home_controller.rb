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

    def emergency
        lat = params[:lat]
        lng = params[:lng]
        victims = params[:victims]
        injure = params[:injure].to_i
        api_key = "54d5b6424abca63f64271ed8"
        uri = "http://www.datagarage.io/api/#{api_key}"
        data_ary = JSON.load(open(uri))
        @suggest_ambulance, @abmulance_hash = HomeHelper.compare_119_distance([lat, lng], data_ary, injure)
         # = HomeHelper.suggest_ambulance(@abmulance_hash, injure)
        if victims
            @shelter_hash = HomeHelper.get_near_shelter([lat, lng])
        end
    end
end
