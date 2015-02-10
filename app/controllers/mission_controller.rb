class MissionController < ApplicationController
    skip_before_filter :verify_authenticity_token, :only => :update

    def update
        @mission = Mission.find(params[:id])
        seq_id = @mission["seq_id"]
        @ambulance = Ambulance.find(seq_id)
        p @ambulance
        p "name: #{@ambulance["lat"]}"
        if @mission.update(mission_params)
            Ambulance.update(@ambulance["id"], exist: @ambulance["exist"]+1)
            respond_to do |format|
                format.json { head :no_content }
            end
        end
    end

    private

    def mission_params
        params.permit(:status)
    end
end