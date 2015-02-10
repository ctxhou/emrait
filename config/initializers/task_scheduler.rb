# require "tw_hospital"

# scheduler = Rufus::Scheduler.new
# scheduler.every("15m") do
#     puts "Crawl hospital data"
#     ary = TwHospital.fetch_all("new")
#     ary.each do |data|
#         hospital = Hospitals.find_by(hospital_id: data[:hospital])
#         hospital.update(report_full: data[:to_119])
#         hospital.update(wait_see: data[:wait_see].to_i)
#         hospital.update(wait_push_bed: data[:wait_push_bed].to_i)
#         hospital.update(wait_bed: data[:wait_bed].to_i)
#         hospital.update(wait_cure_bed: data[:wait_cure_bed].to_i)
#     end
# end 

# scheduler.join