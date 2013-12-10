class ListsController < ApplicationController
  def index
    @lists = List.all.order("order_num ASC")
    @list = List.new
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @lists }
    end

  end

  def new
    @list = List.new
  end

  def create
    @list = List.new(list_params)
    @list.save 
    respond_to do |format|
      #format.html ... don't need this html, causes 500 error (looks for non-existant template)
      format.json { render json: @list }
    end
  end

  def show
    @list = List.find(params[:id])
  end

  def edit
    @list = List.find(params[:id])
  end

  def update
    @list = List.find(params[:id])
    @list.update_attributes(list_params)
    
    head :ok
    # redirect_to lists_path
    # else
    #   render nothing: true
    # end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render nothing: true
  end

  private
    def list_params
      params.require(:list).permit(
        :task,
        :priority,
        :order_num
      )
    end

end