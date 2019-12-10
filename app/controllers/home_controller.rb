class HomeController < ApplicationController
  
  def index
    populate_performers(get_api_response(1))
    @performers = Performer.all
  end

end
