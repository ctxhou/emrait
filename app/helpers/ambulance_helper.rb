require "geocoder"
module AmbulanceHelper
    def AmbulanceHelper.near_ambulance(geo, distance)
        data_ary = Ambulance.all
        abmulance_hash = {}
        data_ary.each do |ary|
            if ary["exist"].to_i > 0
                geo.each do |id, content|
                    abmulance_hash[id] = [] unless abmulance_hash.has_key? id
                    each_geo = [content[:lat], content[:lng]]
                    dis = Geocoder::Calculations.distance_between(each_geo, [ary["lat"],ary["lng"]]).round(3)
                    if dis <= distance
                        content = {}
                        content["distance"] = dis
                        content["content"] = ary
                        # abmulance_hash[id]["distance"] = dis
                        # abmulance_hash[id]['content'] = ary
                        abmulance_hash[id] << content
                    end
                end
            end
        end
        # sort ambulance distance
        abmulance_hash.each do |id, content|
            abmulance_hash[id] = abmulance_hash[id].sort_by{|v| v["distance"]}
        end
        return abmulance_hash
    end
end
