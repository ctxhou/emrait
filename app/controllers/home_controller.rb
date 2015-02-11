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
        @lat = params[:lat]
        @lng = params[:lng]
        @address = params[:address]
        @injure = params[:injure].to_i
        @suggest_ambulance, @abmulance_hash, @d_to_hospital = HomeHelper.compare_119_distance([@lat, @lng], @injure)
        if @d_to_hospital.length == 0
            @clinic = HomeHelper.near_clinic(@lat, @lng)
        end
    end

    def mission
        @mission = Mission.where(status: "ing").order(:created_at)
    end

    def reset
        Mission.delete_all
    end
end
