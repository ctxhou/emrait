require "geocoder"
require "time"
module AiAmbulanceHelper
    @@name = {"pohai"=>"財團法人羅許基金會羅東博愛醫院","cch"=>"彰化基督教醫療財團法人彰化基督教醫院","cgh"=>"國泰綜合醫院","cgmh_chayi"=>"長庚醫療財團法人嘉義長庚紀念醫院","cgmh_kl"=>"長庚醫療財團法人基隆長庚紀念醫院","cgmh_ks"=>"長庚醫療財團法人高雄長庚紀念醫院","cgmh_lingko"=>"長庚醫療財團法人林口長庚紀念醫院","chimei"=>"奇美醫院","chimei_cl"=>"佳里奇美醫院","chimei_ly"=>"柳營奇美醫院","cmuh"=>"中國醫藥大學附設醫院","csh"=>"中山醫學大學附設醫院","edah"=>"義大醫療財團法人義大醫院","kmuh"=>"高雄醫學大學附設中和紀念醫院","ktgh_dajia"=>"光田醫療社團法人光田綜合醫院(大甲院區)","ktgh_shalu"=>"光田醫療社團法人光田綜合醫院(沙鹿總院)","mmh"=>"財團法人臺灣基督長老教會馬偕紀念社會事業基金會馬偕紀念醫院","ncku"=>"國立成功大學醫學院附設醫院","ndmctsgh"=>"三軍總醫院附設民眾診療服務處","ntuh_taipei"=>"國立臺灣大學醫學院附設醫院","ntuh_yunlin"=>"國立臺灣大學醫學院附設醫院雲林分院","scmh"=>"秀傳醫療社團法人秀傳紀念醫院","shh"=>"衛生福利部雙和醫院","skh"=>"新光醫療財團法人新光吳火獅紀念醫院","sltung"=>"童綜合醫療社團法人童綜合醫院","tzuchi"=>"佛教慈濟醫療財團法人台北慈濟醫院","tzuchi_hl"=>"佛教慈濟醫療財團法人花蓮慈濟醫院","vghtc"=>"臺中榮民總醫院","vghtpe"=>"台北榮民總醫院","wanfang"=>"台北市立萬芳醫院"}
    def AiAmbulanceHelper.to_name(id)
        return @@name[id]
    end 

    def AiAmbulanceHelper.compare_119_distance(geo_hash, setup_time, speed, total_injure)
        data_ary = Ambulance.all
        ambulance_queue = {}
        setup_time = setup_time*60
        speed = speed/60.0
        data_ary.each do |ary|
            if ary["exist"].to_i > 0
                1.upto(ary["exist"].to_i) do |k|
                    geo_hash.each do |id, content|
                        each_geo = [content[:lat], content[:lng]]
                        dis = Geocoder::Calculations.distance_between(each_geo, [ary["lat"],ary["lng"]]).round(3)
                        if ambulance_queue.has_key? "#{ary[:name]}#{k}"
                            # 如果原本存在queue裡面的該消防局距離比較遠，那就用現在算到的近的取代之
                            if ambulance_queue["#{ary[:name]}#{k}"][:distance] > dis
                                available_time = (dis/speed)*60.round(0)
                                content = {available_time: available_time, distance: dis, disaster: id, 
                                            phone: ary[:phone], lat: ary[:lat], lng: ary[:lng], id: ary[:id]}
                                ambulance_queue["#{ary[:name]}#{k}"] = content
                            end
                        else
                            available_time = (dis/speed)*60.round(0)
                            content = {available_time: available_time, distance: dis, disaster: id, 
                                        phone: ary[:phone], lat: ary[:lat], lng: ary[:lng], id: ary[:id]}
                            ambulance_queue["#{ary[:name]}#{k}"] = content
                        end
                    end
                end
            end
        end
        d_to_hospital = HospitalHelper.nearest_hospital(geo_hash)

        schedule = self.suggest_ambulance(d_to_hospital, ambulance_queue, geo_hash, setup_time, speed, total_injure)
        schedule.sort!{|a, b| [a[:hos_lat], a[:time_disaster]] <=> [b[:hos_lat], b[:time_disaster]]}
        return schedule, d_to_hospital
    end
    # time unit: second
    def AiAmbulanceHelper.suggest_ambulance(d_to_hospital, ambulance_queue, geo_hash, setup_time, speed, total_injure)
        p ambulance_queue.sort_by{|k,v| v[:available_time]}
        ambulance_queue = ambulance_queue.sort_by{|k,v| v[:available_time]}.to_h
        schedule = []
        now_time = Time.now.to_i
        assigned = []
        while total_injure > 0
            # first = ambulance_queue.shift
            ambulance_queue.each do |k|
                name = k[0]
                value = k[1]
                available_time = value[:available_time]
                dis_to_disaster = value[:distance]
                disaster_id = value[:disaster]
                next if geo_hash[disaster_id][:injure] == 0
                near_hospital = d_to_hospital[disaster_id]
                # dis_to_disaster = Geocoder::Calculations.distance_between([value[:lat], value[:lng]], geo).round(3)
                if assigned.include? name
                    time_arrive_disaster = available_time + (dis_to_disaster/speed)*60.round(0)
                else # 第一次被指派的救護車
                    time_arrive_disaster = available_time 
                end
                next_disaster_id, next_distance = self.next_assign(geo_hash, [near_hospital[:lat], near_hospital[:lng]])
                time_arrive_hospital = time_arrive_disaster + (near_hospital[:distance]/speed)*60.round(0) + setup_time
                ambulance_queue[name][:available_time] = time_arrive_hospital + setup_time
                ambulance_queue[name][:disaster] = next_disaster_id
                ambulance_queue[name][:distance] = next_distance
                schedule << {hos_id: near_hospital[:id], id: value[:id], name: name, start_lat: value[:lat], start_lng: value[:lng], hos_lat: near_hospital[:lat], hos_lng: near_hospital[:lng], phone: value[:phone],
                            hos_name: near_hospital[:name], time_disaster: time_arrive_disaster+now_time, time_hospital: time_arrive_hospital+now_time, distance: dis_to_disaster,
                            disaster_id: disaster_id, rand_id: Random.rand(1000000)}
                ambulance_queue = ambulance_queue.sort_by{|k,v| v[:available_time]}.to_h
                geo_hash[disaster_id][:injure] -= 1
                total_injure -= 1
                break
            end
        end
        # p schedule
        return schedule
    end

    def self.next_assign(geo_hash, hos_geo)
        distance = 100000
        disaster = nil
        geo_hash.each do |id, value|
            next if value[:injure] == 0
            dis_from_hos_to_disaster = Geocoder::Calculations.distance_between([value[:lat], value[:lng]], hos_geo).round(3)
            if distance > dis_from_hos_to_disaster
                distance = dis_from_hos_to_disaster
                disaster = id
            end
        end

        return disaster, distance
    end

    def self.distance_disaster_to_hospital(geo)
        # get the near hospital data
        ary = []
        hospital = Hospitals.all
        hospital.each do |data|
            dis = Geocoder::Calculations.distance_between(geo, [data["lat"],data["lng"]]).round(3)
            if dis <= 4 # if the hospital is in 4 km distance, return 
                ary << {id:data["id"], name: data["name"], distance: dis, lat: data["lat"], lng: data["lng"], address: data["address"],
                        report_full: data["report_full"], wait_see: data["wait_see"], wait_push_bed:data["wait_push_bed"],
                        wait_bed: data["wait_bed"], wait_cure_bed: data["wait_cure_bed"]}
            end
        end
        return ary.sort_by {|k| k[:distance]}
    end
end
