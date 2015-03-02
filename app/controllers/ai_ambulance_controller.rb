class AiAmbulanceController < ApplicationController
    def ai_direction
        result = []
        setup_time = 10 # 15 min to pick up patient and place in hospital
        speed = 50 # speed: 70km/hr = (70/60)km/min
        setup_time = params[:setup].to_i if params[:setup] # 15 min to pick up patient and place in hospital
        speed = params[:speed].to_i if params[:speed] # speed: 70km/hr = (70/60)km/min
        total_injure = 0
        geo_hash = {}
        geo_code = {}
        color_json = {}
        length = params[:length].to_i
        1.upto(length) do |k|
            next unless params["lat#{k}".intern]
            this_injure = params["injure#{k}".intern].to_i
            geo_hash[k] = {lat: params["lat#{k}".intern], lng: params["lng#{k}".intern], address: params["address#{k}".intern], injure: this_injure}
            total_injure += this_injure
            geo_code[k] =  [params["lat#{k}".intern], params["lng#{k}".intern]]
        end
        schedule, d_to_hospital = AiAmbulanceHelper.compare_119_distance(geo_hash, setup_time, speed, total_injure)
        schedule.each do |k|
            # color_json[k[:name]] = "#"+"%06x" % (rand * 0xffffff) unless color_json.has_key? k[:name]
            color_json[k[:name]] = "#008800"
            tmp = {}
            id = k[:disaster_id]
            tmp[:from] = [k[:start_lat], k[:start_lng]]
            tmp[:fromText] = k[:name]
            tmp[:toText] = k[:name]
            tmp[:to] = [k[:hos_lat], k[:hos_lng]]
            tmp[:waypoint] = [geo_code[id]]
            tmp[:strokeColor] = color_json[k[:name]]
            result.push(tmp)
        end
        render json: result.to_json
    end
end
