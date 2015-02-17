class HospitalController < ApplicationController

    def get_hospital
        json = []
        hospital = Hospitals.find(params[:id])
        json << {name: hospital[:name],distance: "fake", lat: hospital[:lat], lng: hospital[:lng]}
        render json: json.to_json
    end

    def multi_near_hospital
        length = params[:length].to_i
        @geo_hash = {}
        1.upto(length) do |k|
            next unless params["lat#{k}".intern]
            @geo_hash[k] = {lat: params["lat#{k}".intern], lng: params["lng#{k}".intern], address: params["address#{k}".intern], injure: params["injure#{k}".intern].to_i}
        end
        ary = HospitalHelper.near_hospital(@geo_hash)
        # render json: ary.to_json
    end

end
