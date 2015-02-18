Rails.application.routes.draw do
  root to: 'root#index'

  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get  '/signin',  to: 'sessions#new'
  post '/signin',  to: 'sessions#create'
  get  '/signout', to: 'sessions#destroy'

  namespace :api, defaults: { format: :json } do
    get 'current_user', to: 'users#current'
    resources :users,  only: [:index, :show]
    resources :tracks, only: [:show]
    resources :posts, only: [:index, :show, :create, :destroy]
    resources :likes,  only: [:index, :show, :create, :destroy]
  end
end
