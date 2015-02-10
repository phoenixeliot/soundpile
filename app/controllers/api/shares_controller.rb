class Api::SharesController < ApplicationController
  def index
    @shares = Share.all
    render :index
  end

  def show
    @share = Share.find(params[:id])
    render :show
  end
end
