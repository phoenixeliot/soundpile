class Api::SharesController < ApplicationController
  def index
    @shares = Share.all.order(created_at: :desc)
    render :index
  end

  def show
    @share = Share.find(params[:id])
    render :show
  end

  def create
    share = Share.new(share_params)
    if share.save
      render json: share
    else
      render json: { errors: share.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    share = Share.find(params[:id])
    share.destroy
    render json: share
  end

  private
    def share_params
      params.require(:share).permit(:owner_id, :track_id)
    end
end
