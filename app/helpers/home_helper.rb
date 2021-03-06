require "geocoder"
module HomeHelper
    @@name = {"pohai"=>"財團法人羅許基金會羅東博愛醫院","cch"=>"彰化基督教醫療財團法人彰化基督教醫院","cgh"=>"國泰綜合醫院","cgmh_chayi"=>"長庚醫療財團法人嘉義長庚紀念醫院","cgmh_kl"=>"長庚醫療財團法人基隆長庚紀念醫院","cgmh_ks"=>"長庚醫療財團法人高雄長庚紀念醫院","cgmh_lingko"=>"長庚醫療財團法人林口長庚紀念醫院","chimei"=>"奇美醫院","chimei_cl"=>"佳里奇美醫院","chimei_ly"=>"柳營奇美醫院","cmuh"=>"中國醫藥大學附設醫院","csh"=>"中山醫學大學附設醫院","edah"=>"義大醫療財團法人義大醫院","kmuh"=>"高雄醫學大學附設中和紀念醫院","ktgh_dajia"=>"光田醫療社團法人光田綜合醫院(大甲院區)","ktgh_shalu"=>"光田醫療社團法人光田綜合醫院(沙鹿總院)","mmh"=>"財團法人臺灣基督長老教會馬偕紀念社會事業基金會馬偕紀念醫院","ncku"=>"國立成功大學醫學院附設醫院","ndmctsgh"=>"三軍總醫院附設民眾診療服務處","ntuh_taipei"=>"國立臺灣大學醫學院附設醫院","ntuh_yunlin"=>"國立臺灣大學醫學院附設醫院雲林分院","scmh"=>"秀傳醫療社團法人秀傳紀念醫院","shh"=>"衛生福利部雙和醫院","skh"=>"新光醫療財團法人新光吳火獅紀念醫院","sltung"=>"童綜合醫療社團法人童綜合醫院","tzuchi"=>"佛教慈濟醫療財團法人台北慈濟醫院","tzuchi_hl"=>"佛教慈濟醫療財團法人花蓮慈濟醫院","vghtc"=>"臺中榮民總醫院","vghtpe"=>"台北榮民總醫院","wanfang"=>"台北市立萬芳醫院"}
    def HomeHelper.to_name(id)
        return @@name[id]
    end 

    def HomeHelper.get_near_shelter(geo)
        result_hash = []
        distance = 1.5 #km
        box = Geocoder::Calculations.bounding_box(geo, distance)
        shelter = Shelter.where(lat: (box[0]..box[2]), lng:(box[1]..box[3]))
        shelter.each do |ary|
            dis = Geocoder::Calculations.distance_between(geo, [ary["lat"],ary["lng"]]).round(3)
            if dis < 1.2
                tmp = {}
                tmp["distance"] = dis
                tmp["name"] = ary[:name]
                tmp["id"] = ary[:id]
                tmp["city"] = ary[:city]
                tmp["address"] = ary[:address]
                tmp["lat"] = ary[:lat]
                tmp["lng"] = ary[:lng]
                result_hash.push(tmp)
            end
        end
        # p result_hash
        return result_hash.sort_by {|k| k["distance"]}
    end


    def HomeHelper.near_clinic(lat, lng)
        center_point = [lat, lng]
        distance = 3 #km
        box = Geocoder::Calculations.bounding_box(center_point, distance)
        selector = Addressable::URI.parse("selector=緯度>=#{box[0]}AND緯度<=#{box[2]}AND經度>=#{box[1]}AND經度<=#{box[3]}").normalize.to_str
        api_key = "54d3420c4abca63f6426cd35"
        uri = "http://www.datagarage.io/api/#{api_key}?#{selector}"
        @json = JSON.load(open(uri))
        @json.each_with_index do |ary, index|
            dis = Geocoder::Calculations.distance_between(center_point, [ary["緯度"],ary["經度"]]).round(3)
            @json[index]["distance"] = dis
        end
        return @json
    end
end