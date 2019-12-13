class HomeController < ApplicationController
  
  def index
    @performers = Performer.all
    # email test
    @user = User.first
  end

  def set_updates
    get_api_response(1)
  end

end
