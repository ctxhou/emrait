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

    end



    def clinic_search
        @address = params[:address]
        @lat = params[:lat]
        @lng = params[:lng]
    end

    def emergency
        @smart_url = URI.parse(request.original_url).query
        length = params[:length].to_i
        @geo_hash = {}
        1.upto(length) do |k|
            next unless params["lat#{k}".intern]
            @geo_hash[k] = {lat: params["lat#{k}".intern], lng: params["lng#{k}".intern], address: params["address#{k}".intern], injure: params["injure#{k}".intern].to_i}
        end
        @d_to_hospital = HospitalHelper.distance_disaster_to_hospital(@geo_hash)
    end

    def ai_ambulance
        @setup_time = 1 # 15 min to pick up patient and place in hospital
        @speed = 50 # speed: 70km/hr = (70/60)km/min
        @geo_hash = {}
        @total_injure = 0
        length = params[:length].to_i
        1.upto(length) do |k|
            next unless params["lat#{k}".intern]
            this_injure = params["injure#{k}".intern].to_i
            @geo_hash[k] = {lat: params["lat#{k}".intern], lng: params["lng#{k}".intern], address: params["address#{k}".intern], injure: this_injure}
            @total_injure += this_injure
        end
        @schedule, @d_to_hospital = AiAmbulanceHelper.compare_119_distance(@geo_hash, @setup_time, @speed, @total_injure)
        if @d_to_hospital.length == 0
            @clinic = AiAmbulanceHelper.near_clinic(@lat, @lng)
        end
    end

    def mission
        @mission = Mission.where(status: "ing").order(:created_at)
    end

    def reset
        Mission.delete_all
    end
end
