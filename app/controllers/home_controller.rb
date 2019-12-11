class HomeController < ApplicationController
  
  def index
    get_api_response(1)
    @performers = Performer.all
  end

end
