class RootController < ApplicationController
  def index
    render json: "hey, #{(current_user && current_user.username) || 'nobody'}!"
  end
end
