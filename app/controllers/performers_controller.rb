class PerformersController < ApplicationController
  before_action :authenticate_user!

  def index
    @performers = Performer.all
  end

  def show
    @performer = Performer.find(params[:id])
    @events = @performer.events.all.distinct
  end
  
end