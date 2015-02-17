require "geocoder"
module AmbulanceHelper
    def AmbulanceHelper.near_ambulance(geo, distance)
        data_ary = Ambulance.all
        ambulance_hash = {}
        data_ary.each do |ary|
            if ary["exist"].to_i > 0
                geo.each do |id, content|
                    each_geo = [content[:lat], content[:lng]]
                    unless ambulance_hash.has_key? id
                        ambulance_hash[id] = {} 
                        ambulance_hash[id]["hospital"] = HospitalHelper.near_hospital(each_geo)
                        ambulance_hash[id]["ambulance"] = []
                    end
                    dis = Geocoder::Calculations.distance_between(each_geo, [ary["lat"],ary["lng"]]).round(3)
                    if dis <= distance
                        content = {}
                        content["distance"] = dis
                        content["content"] = ary
                        ambulance_hash[id]["ambulance"] << content
                    end
                end
            end
        end
        # sort ambulance distance
        ambulance_hash.each do |id, content|
            ambulance_hash[id]["ambulance"] = ambulance_hash[id]["ambulance"].sort_by{|v| v["distance"]}
        end
        return ambulance_hash
    end
end
