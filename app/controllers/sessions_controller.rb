class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params[:username],
                                     user_params[:password])
    if @user
      log_in @user
      redirect_to root_url
    else
      flash[:errors] = ["Invalid login."]
      redirect_to login_url
    end
  end

  def destroy
    log_out
    redirect_to login_url
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end

end
