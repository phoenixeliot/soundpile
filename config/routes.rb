Rails.application.routes.draw do
  root to: 'root#index'
  resources :users,  only: [:new, :create, :show]
  # resource :session, only: [:new, :create, :destroy]
  get  '/login',  to: 'sessions#new'
  post '/login',  to: 'sessions#create'
  get  '/logout', to: 'sessions#destroy'
end
