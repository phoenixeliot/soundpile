Rails.application.routes.draw do
  root to: 'root#index'
  # resources :users,  only: [:new, :create, :show]
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  # resource :session, only: [:new, :create, :destroy]
  get  '/signin',  to: 'sessions#new'
  post '/signin',  to: 'sessions#create'
  get  '/signout', to: 'sessions#destroy'
end
