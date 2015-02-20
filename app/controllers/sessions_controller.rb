class SessionsController < ApplicationController
  force_ssl if: :ssl_configured?
  #Might need this everywhere when I move to backbone?

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
      @user = User.new(username: user_params[:username])
      render :new
    end
  end

  def destroy
    log_out
    redirect_to signin_url
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end

end
