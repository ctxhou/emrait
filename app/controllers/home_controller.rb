require 'open-uri'
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

    end
end
