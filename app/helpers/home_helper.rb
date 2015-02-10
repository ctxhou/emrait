require "geocoder"
module HomeHelper
    @@name = {"pohai"=>"財團法人羅許基金會羅東博愛醫院","cch"=>"彰化基督教醫療財團法人彰化基督教醫院","cgh"=>"國泰綜合醫院","cgmh_chayi"=>"長庚醫療財團法人嘉義長庚紀念醫院","cgmh_kl"=>"長庚醫療財團法人基隆長庚紀念醫院","cgmh_ks"=>"長庚醫療財團法人高雄長庚紀念醫院","cgmh_lingko"=>"長庚醫療財團法人林口長庚紀念醫院","chimei"=>"奇美醫院","chimei_cl"=>"佳里奇美醫院","chimei_ly"=>"柳營奇美醫院","cmuh"=>"中國醫藥大學附設醫院","csh"=>"中山醫學大學附設醫院","edah"=>"義大醫療財團法人義大醫院","kmuh"=>"高雄醫學大學附設中和紀念醫院","ktgh_dajia"=>"光田醫療社團法人光田綜合醫院(大甲院區)","ktgh_shalu"=>"光田醫療社團法人光田綜合醫院(沙鹿總院)","mmh"=>"財團法人臺灣基督長老教會馬偕紀念社會事業基金會馬偕紀念醫院","ncku"=>"國立成功大學醫學院附設醫院","ndmctsgh"=>"三軍總醫院附設民眾診療服務處","ntuh_taipei"=>"國立臺灣大學醫學院附設醫院","ntuh_yunlin"=>"國立臺灣大學醫學院附設醫院雲林分院","scmh"=>"秀傳醫療社團法人秀傳紀念醫院","shh"=>"衛生福利部雙和醫院","skh"=>"新光醫療財團法人新光吳火獅紀念醫院","sltung"=>"童綜合醫療社團法人童綜合醫院","tzuchi"=>"佛教慈濟醫療財團法人台北慈濟醫院","tzuchi_hl"=>"佛教慈濟醫療財團法人花蓮慈濟醫院","vghtc"=>"臺中榮民總醫院","vghtpe"=>"台北榮民總醫院","wanfang"=>"台北市立萬芳醫院"}
    def HomeHelper.to_name(id)
        return @@name[id]
    end 

    def HomeHelper.compare_119_distance(geo, injure)
        data_ary = Ambulance.all
        abmulance_hash = {}
        data_ary.each do |ary|
            if ary["exist"].to_i > 0
                dis = Geocoder::Calculations.distance_between(geo, [ary["lat"],ary["lng"]]).round(3)
                abmulance_hash[dis] = ary
            end
        end
        d_to_hospital = self.distance_disaster_to_hospital(geo)
        abmulance_hash = abmulance_hash.sort.to_h
        suggest, abmulance_hash = self.suggest_ambulance(abmulance_hash, injure)
        return suggest, abmulance_hash, d_to_hospital
    end

    def self.distance_119_to_disaster(disaster, fire_fighter)

    end

    def self.distance_disaster_to_hospital(disaster)
        ary = []
        hospital = Hospitals.all
        hospital.each do |data|
            dis = Geocoder::Calculations.distance_between(disaster, [data["lat"],data["lng"]]).round(3)
            if dis <= 8 # if the hospital is in 8 km distance, return 
                ary << {name: data["name"], distance: dis, lat: data["lat"], lng: data["lng"]}
            end
        end

        return ary.sort_by {|k| k[:distance]}
    end

    def HomeHelper.suggest_ambulance(abmulance_hash, injure)
        suggest = {}
        count = 0
        abmulance_hash.each do |dis, data|
            if injure > 0
                suggest[dis] = data["number"]
                injure -= data["number"]
                count += 1
            else
                break
            end
        end
        return suggest, (abmulance_hash.first count+4)
    end

    def HomeHelper.get_near_shelter(geo)
        result_hash = {}
        distance = 1.5 #km
        box = Geocoder::Calculations.bounding_box(geo, distance)
        api_key = "54ce0b394abca63f6426bd97" #shelter
        selector = "selector=lat>=#{box[0]}ANDlat<=#{box[2]}ANDlng>=#{box[1]}ANDlng<=#{box[3]}"
        uri = URI.encode("http://www.datagarage.io/api/#{api_key}?#{selector}")
        shelter = JSON.load(open(URI.parse(uri)))
        shelter.each do |ary|
            dis = Geocoder::Calculations.distance_between(geo, [ary["lat"],ary["lng"]]).round(3)
            if dis < 1.2
                result_hash[dis] = ary
            end
        end
        return result_hash.sort.to_h
    end
end