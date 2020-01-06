class VenuesController < ApplicationController
  before_action :authenticate_user!

  def index
    @venues = Venue.all
  end
  
end