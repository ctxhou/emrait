module HospitalHelper
    def HospitalHelper.distance_disaster_to_hospital(geo_hash)
        d_to_hospital = []
        hospital = Hospitals.all
        hospital.each do |data|
            geo_hash.each do |id, content|
                each_geo = [content[:lat], content[:lng]]
                dis = Geocoder::Calculations.distance_between(each_geo, [data["lat"],data["lng"]]).round(3)
                if dis <= 4 # if the hospital is in 4 km distance, return 
                    d_to_hospital << {name: data["name"], distance: dis, lat: data["lat"], lng: data["lng"], address: data["address"],
                            report_full: data["report_full"], wait_see: data["wait_see"], wait_push_bed:data["wait_push_bed"],
                            wait_bed: data["wait_bed"], wait_cure_bed: data["wait_cure_bed"]}
                end
            end
        end

        return d_to_hospital
    end
end
