class Api::SharesController < ApplicationController
  def index
    @shares = Share.all.order(created_at: :desc)
    render :index
  end

  def show
    @share = Share.find(params[:id])
    render :show
  end
end
