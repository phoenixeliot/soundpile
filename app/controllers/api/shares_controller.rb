class Api::SharesController < ApplicationController
  def index #TODO: Should this be Users#Show instead?
    user_id = params[:user_id]
    if user_id
      user = User.find(user_id)
      @shares = user.shares#Share.where(owner_id: user_id) #TODO: fix this inconsistency
    else
      @shares = Share.all
    end
    render :index
  end

  def show
    @share = Share.find(params[:id])
    render :show
  end
end
