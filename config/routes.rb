Rails.application.routes.draw do
  get 'event_follows/create'
  get 'event_follows/new'
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
    resources :performers do
      resources :events
    end
    # resources :users, only: [:show]
    post "home/populate_database"
    post "home/update_events"
    post "home/send_email"

end
