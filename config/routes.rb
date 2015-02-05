Rails.application.routes.draw do
  root to: 'root#index'

  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get  '/signin',  to: 'sessions#new'
  post '/signin',  to: 'sessions#create'
  get  '/signout', to: 'sessions#destroy'

  namespace :api, defaults: { format: :json } do
    resources :tracks
  end
end
