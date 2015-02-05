class Api::TracksController < ApplicationController
  def index
    tracks = Track.all
    render json: tracks
  end

  def show
    track = Track.find(params[:id])
    render json: track
  end
end
