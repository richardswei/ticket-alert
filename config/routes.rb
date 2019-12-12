Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }
  # eg. http://localhost:3000/users/sign_in
  devise_for :admin_users, ActiveAdmin::Devise.config
  # eg. http://localhost:3000/admins/sign_in
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
    resources :performers do
      resources :events
    end
    post "home/set_updates"

end
