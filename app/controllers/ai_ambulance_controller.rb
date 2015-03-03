class AiAmbulanceController < ApplicationController
    def ai_direction
        color = ["#6b6b6b","#e00b00","#62c100","#0e00f4","#9d6e8a","#988f66","#191919"]
        result = []
        setup_time = 10 # 15 min to pick up patient and place in hospital
        speed = 50 # speed: 70km/hr = (70/60)km/min
        setup_time = params[:setup].to_i if params[:setup] # 15 min to pick up patient and place in hospital
        speed = params[:speed].to_i if params[:speed] # speed: 70km/hr = (70/60)km/min
        total_injure = 0
        geo_hash = {}
        geo_code = {}
        color_json = {}
        save_id = []
        length = params[:length].to_i
        1.upto(length) do |k|
            next unless params["lat#{k}".intern]
            this_injure = params["injure#{k}".intern].to_i
            geo_hash[k] = {lat: params["lat#{k}".intern], lng: params["lng#{k}".intern], address: params["address#{k}".intern], injure: this_injure}
            total_injure += this_injure
            geo_code[k] =  [params["lat#{k}".intern].to_f, params["lng#{k}".intern].to_f]
        end
        hos_geo = {}
        schedule, d_to_hospital = AiAmbulanceHelper.compare_119_distance(geo_hash, setup_time, speed, total_injure)
        schedule.each do |k|
            id = k[:id]
            next if save_id.include? id
            save_id << id
            unless color_json.has_key? k[:name]
                if color.length > 0
                    color_json[k[:name]] = color.shift
                else
                    color_json[k[:name]] = "#"+"%06x" % (rand * 0xffffff) 
                end
            end
            # color_json[k[:name]] = "#e7e7e7"
            tmp = {}
            disaster_id = k[:disaster_id]
            tmp[:from] = [k[:start_lat], k[:start_lng]]
            tmp[:fromText] = k[:name]
            # tmp[:toText] = k[:name]
            hos_geo[disaster_id] = [k[:hos_lat], k[:hos_lng]]
            # tmp[:waypoint] = [geo_code[disaster_id]]
            tmp[:to] = geo_code[disaster_id]
            tmp[:color] = color_json[k[:name]]
           
            tmp[:icon] = {to:"http://i.imgur.com/B8xApKX.png", from: "http://i.imgur.com/rXh2tJE.png"} #http://i.imgur.com/g8CFAxs.png
            result.push(tmp)
        end
        hos_geo.each do |id, geo|
            tmp = {}
            tmp[:from] = geo_code[id]
            tmp[:to] = geo
            tmp[:icon] = {to: "http://i.imgur.com/g8CFAxs.png"}
            result.unshift(tmp)
        end
        render json: result.to_json
    end
end
