class PerformersController < ApplicationController
  before_action :authenticate_user!

  def index
    @performers = Performer.all
  end
  
end