class HomeController < ApplicationController
  require 'httparty'
  require 'json'
  require 'date'
  
  def index
    @performers = Performer.all
    # email test
  end

end
