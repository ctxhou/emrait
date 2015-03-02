Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root :to => "home#index"
  get '/clinic' => "home#clinic"
  get '/clinic_search' => "home#clinic_search"
  get '/clinic/:lat/:lng' => 'clinic#get_clinic', :constraints => { :lng => /[\w+\.]+/, :lat => /[\w+\.]+/ }
  get '/emergency_input' => "home#emergency_input"
  get '/emergency_result' => "home#emergency_result"
  get '/smart_emergency' => "home#ai_ambulance"
  get '/ambulance/:id' => "ambulance#show"
  post '/assign_mission' => "ambulance#assign_mission"
  get '/mission' => "home#mission"
  get '/hospital_distance' => "ambulance#to_hospital"
  put '/mission/:id' => "mission#update"
  get '/shelter' => "shelter#index"
  get '/shelter/:id' => "shelter#show"
  post '/shelter/:id' => "shelter#create"
  get '/shelter_result' => "shelter#result"
  get '/hospital/:id' => "hospital#get_hospital"
  get '/near_hospital' => "hospital#multi_near_hospital"
  get '/near_ambulance/' => "ambulance#near_ambulance"
  get '/near_shelter/' => "shelter#near_shelter"
  get '/ai_direction/' => "ai_ambulance#ai_direction"
  
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
