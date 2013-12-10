class SessionsController < ApplicationController
  def new
  end

  def create
    user = login(params[:email], params[:password])
    if user
      redirect_to lists_path
    else
      flash.now.alert = "Email or password was invalid. Please try again."
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path, :notice => "Logged out"
  end
end
