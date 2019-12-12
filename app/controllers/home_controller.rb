class HomeController < ApplicationController
  
  def index
    @performers = Performer.all
  end

  def set_updates
    get_api_response(1)
  end

end
