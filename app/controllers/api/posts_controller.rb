class Api::PostsController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc)
    render :index
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    render json: post
  end

  private
    def post_params
      params.require(:post).permit(:owner_id, :track_id)
    end
end
