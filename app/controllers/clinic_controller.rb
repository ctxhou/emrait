class ClinicController < ApplicationController
    def get_clinic
        center_point = [params[:lat], params[:lng]]
        distance = 1 #km
        box = Geocoder::Calculations.bounding_box(center_point, distance)
        selector = Addressable::URI.parse("selector=緯度>=#{box[0]}AND緯度<=#{box[2]}AND經度>=#{box[1]}AND經度<=#{box[3]}").normalize.to_str
        api_key = "54d3420c4abca63f6426cd35"
        uri = "http://www.datagarage.io/api/#{api_key}?#{selector}"
        @json = JSON.load(open(uri))
        @json.each_with_index do |ary, index|
            dis = Geocoder::Calculations.distance_between(center_point, [ary["緯度"],ary["經度"]]).round(3)
            @json[index]["distance"] = dis
        end
        render json: @json
    end
end
