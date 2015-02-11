
# set :output, "/log/crawl.log"
# require "tw_hospital"

# every 1.hours do
#     puts "Crawl hospital data"
#     ary = TwHospital.fetch_all
#     ary.each do |data|
#         hospital = Hospitals.find_by(hospital_id: data[:hospital])
#         hospital.update(report_full: data[:to_119])
#         hospital.update(wait_see: data[:wait_see].to_i)
#         hospital.update(wait_push_bed: data[:wait_push_bed].to_i)
#         hospital.update(wait_bed: data[:wait_bed].to_i)
#         hospital.update(wait_cure_bed: data[:wait_cure_bed].to_i)
#     end
# end

# # Learn more: http://github.com/javan/whenever
