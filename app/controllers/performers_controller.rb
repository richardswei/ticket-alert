class PerformersController < ApplicationController

  def index
    @performers = Performer.all
  end
  
end