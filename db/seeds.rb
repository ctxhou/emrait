require "open-uri"
require "json"

Ambulance.delete_all
data_ary = JSON.load(open("http://www.datagarage.io/api/54d71ca24abca63f6427211a"))

data_ary.each do |ary|
    Ambulance.create!(:seq_id=>ary["seq_id"], :site_type=>ary["type"], :name=>ary["name"], :address=>ary["address"], :status=>"pending",
                      :phone=>ary["phone"], :lat=>ary["lat"], :lng=>ary["lng"], :number=>ary["number"], :car_id=>ary["car_id"], :exist=>ary["number"])
end

Hospitals.delete_all
data_ary = JSON.load(open("http://www.datagarage.io/api/54d9b60b4abca63f6427259e"))
data_ary.each do |ary|
    Hospitals.create!(:hospital_id=>ary["uid"], :name=>ary["hospital"], :address=>ary["address"], :lat=>ary["lat"],
                      :lng=>ary["lng"])
end
