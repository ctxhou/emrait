# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( dist/ai_ambulance.js )
Rails.application.config.assets.precompile += %w( dist/shelter.js )
Rails.application.config.assets.precompile += %w( dist/clinic.js )
Rails.application.config.assets.precompile += %w( dist/ai_ambulance.js )
Rails.application.config.assets.precompile += %w( dist/mission.js )
Rails.application.config.assets.precompile += %w( vendor/pace.min.js )
Rails.application.config.assets.precompile += %w( dist/clinic_search.js )
Rails.application.config.assets.precompile += %w( dist/emergency.js )
Rails.application.config.assets.precompile += %w( dist/shelter_result.js )
Rails.application.config.assets.precompile += %w( dist/shelter_show.js )
