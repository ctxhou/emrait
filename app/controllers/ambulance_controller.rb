class AmbulanceController < ApplicationController
    skip_before_filter :verify_authenticity_token, :only => :assign_mission
    def show
        render json: Ambulance.find(params[:id])
    end

    def to_hospital
        lat = params[:lat]
        lng = params[:lng]
        return_json = HomeHelper.distance_disaster_to_hospital([lat, lng]).to_json
        render json: return_json
    end

    def assign_mission
        # exist = params[:exist].to_i
        assign = params[:assign]
        assign.each do |param|
            end_lat = param[:end_lat]
            end_lng = param[:end_lng]
            exist = param["exist"].to_i
            @ambulance = Ambulance.find(param["id"])
            start_lat = @ambulance["lat"]
            start_lng = @ambulance["lng"]
            structure = @ambulance["name"]
            seq_id = @ambulance["seq_id"] # 119 station id
            hospital = param[:hospital]
            exist.times do |k|
                Mission.create(hospital: hospital, seq_id: param["id"], start_lat: start_lat, start_lng: start_lng, end_lat: end_lat, end_lng: end_lng, status: 'ing', structure: structure)
            end

            less_ambulance = @ambulance["exist"] - exist
            Ambulance.update(param[:id], exist: less_ambulance)
        end
        respond_to do |format|
            format.json { head :no_content }
        end
    end

end
