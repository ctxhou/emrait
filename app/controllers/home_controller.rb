require 'open-uri'
require "addressable/uri"
require "json"

class HomeController < ApplicationController
    def index
        # uri = "http://140.116.96.118:9000/new.json"
        # @json = JSON.load(open(uri))
    end

    def clinic

    end

    def shelter
        @lat = params[:lat]
        @lng = params[:lng]
        @victims = params[:victims]
        if @victims
            @shelter_hash = HomeHelper.get_near_shelter([@lat, @lng])
        end
    end

    def clinic_search
        @address = params[:address]
        @lat = params[:lat]
        @lng = params[:lng]
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
        @lat = params[:lat]
        @lng = params[:lng]
        @victims = params[:victims]
        @injure = params[:injure].to_i
        @suggest_ambulance, @abmulance_hash, @d_to_hospital = HomeHelper.compare_119_distance([@lat, @lng], @injure)
    end

    def mission
        @mission = Mission.where(status: "ing").order(:created_at)
    end

    def reset
        Mission.delete_all

    end
end
