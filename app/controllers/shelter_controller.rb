class ShelterController < ApplicationController
    def index

    end

    def result
        @lat = params[:lat]
        @lng = params[:lng]
        @victims = params[:victims]
        if @victims
            @shelter_hash = HomeHelper.get_near_shelter([@lat, @lng])
        end
    end
end
