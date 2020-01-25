class UsersController < ApplicationController
  require "active_support/time"
  def show
    p current_user
    @user = User.find(current_user.id)
    @event_follows = User.find(current_user.id).event_follows
  end

  def my_profile
    show
  end

end
