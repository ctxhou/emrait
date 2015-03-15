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

# data_ary = JSON.load(open("http://140.116.96.122:8000/result.json"))
# data_ary.each do |ary|
#     hospital = Hospitals.find_by(hospital_id: ary["hospital"])
#     hospital.update(report_full: ary["to_119"], wait_see: ary["wait_see"], wait_push_bed: ary["wait_push_bed"], wait_bed: ary["wait_bed"], wait_cure_bed: ary["wait_cure_bed"])
# end

Shelter.delete_all
data_ary = JSON.load(open("http://www.datagarage.io/api/54ce0b394abca63f6426bd97/"))
data_ary.each do |ary|
    Shelter.create!(:uid=>ary["災民收容所編號"], :name=>ary["災民收容所名稱"], :city=>ary["所在縣市"], :state=>ary["所在鄉鎮市"],
                    :address=>ary["收容所地址"], :lat=>ary["lat"], :lng=>ary["lng"])
end