class HospitalController < ApplicationController
    def get_hospital
        json = []
        hospital = Hospitals.find(params[:id])
        json << {name: hospital[:name],distance: "fake", lat: hospital[:lat], lng: hospital[:lng]}
        render json: json.to_json
    end
end
