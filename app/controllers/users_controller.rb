class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render :show
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to signup_url
    end
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
