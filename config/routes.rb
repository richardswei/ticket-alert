Rails.application.routes.draw do
  # get 'event_follows/new'
  devise_for :users
  devise_scope :user do
    get '/users', to: 'devise/registrations#new'
    get '/users/password', to: 'devise/passwords#new'
  end
  # eg. http://localhost:3000/users/sign_in
  devise_for :admin_users, ActiveAdmin::Devise.config
  # eg. http://localhost:3000/admins/sign_in
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
    resources :search, only: :index
    resources :venues, only: :index
    resources :users do
      get :my_profile, on: :member
    end
    resources :event_follows, :only => [:create, :destroy]
    resources :performers do
      get :mlb, on: :collection
      get :nba, on: :collection
      get :nfl, on: :collection
      get :nhl, on: :collection
      post :add_team_follow, on: :member
      delete :delete_team_follow, on: :member
      resources :events
    end
    resources :events do 
      post :add_individual_follow, on: :member
      delete :delete_individual_follow, on: :member
    end

    # resources :users, only: [:show]
    # post "home/populate_database"
    # post "home/update_events"
    # post "home/send_email"

end
