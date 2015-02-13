class Api::TracksController < ApplicationController
  def index
    tracks = Track.all.includes(:likes).order(created_at: :desc)
    render json: tracks
  end

  def show
    @track = Track.find(params[:id])
    render :show
  end
end
