class ShelterController < ApplicationController
    skip_before_filter :verify_authenticity_token

    def index
        @header = ["", "active", ""]
    end

    def result
        @header = ["", "active", ""]
        @lat = params[:lat]
        @lng = params[:lng]
        @victims = params[:victims]
        if @victims
            @shelter_hash = HomeHelper.get_near_shelter([@lat, @lng])
        end
    end

    def show
        @header = ["", "active", ""]
        @id = params[:id]
        @shelter = Shelter.find(@id)
        @shelter_info = ShelterInfo.where(shelter_id: @id)
    end

    def create
        ShelterInfo.create({name: params[:name], content: params[:report], shelter_id: params[:id]})
        redirect_to :action => "show", :id=>params[:id]
    end
end
