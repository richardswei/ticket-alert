class UsersController < ApplicationController

  def show
    p current_user
    @user = User.find(current_user.id)
  end

end
