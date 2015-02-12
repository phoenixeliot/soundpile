class Api::UsersController < ApplicationController
  def index
    users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    @include_shares = true
    render :show
  end

  def current
    @user = current_user
    if @user
      @include_id = true
      render :show
    else
      render json: {}
    end
  end
end
