// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){

$(".tudu-list").sortable({
  start: function(e, ui){
    ui.placeholder.height(ui.item.height());
  }
});

var orderSorted = function(){
  $(".tudu-list-task").each(function(){
    var index = $(this).index()+1;
    $(this).find(".tudu-order-input").val(index).submit();
    console.log("stopped sortable" + index);
  });
}

$(".tudu-list").on("sortstop", function(e, ui){
  orderSorted();
});

var EditingTask = function(element){
  var tuDuTask = element.closest(".tudu-list-task");
  if(!tuDuTask.hasClass("edit-mode")){

    $(".tudu-list-task").removeClass("edit-mode");
    $(".tudu-update").addClass("hidden");
    $(".tudu-edit").removeClass("hidden");
    $(".tudu-edit-form").addClass("hidden");
    $(".tudu-task").removeClass("hidden");
    $(".tudu-edit-cancel").addClass("hidden");

    $(".tudu-list-task").each(function(){
      $(this).find(".tudu-edit-input").val($(this).find(".tudu-task").text());
    })

    tuDuTask.addClass("edit-mode");
    tuDuTask.find(".tudu-update, .tudu-edit-cancel").removeClass("hidden");
    tuDuTask.find(".tudu-edit").addClass("hidden");
    tuDuTask.find(".tudu-task").addClass("hidden");
    tuDuTask.find(".tudu-edit-form").removeClass("hidden");
  }
}

var UpdatingTask = function(element){
  var tuduTask = element.closest(".tudu-list-task");
  tuduTask.find(".tudu-edit-input").submit();
  tuduTask.find(".tudu-task").text(tuduTask.find(".tudu-edit-input").val());
  tuduTask.find(".tudu-edit-form").addClass("hidden");
  tuduTask.find(".tudu-task").removeClass("hidden");
  tuduTask.find(".tudu-task").hide().fadeIn(500);
  tuduTask.find(".tudu-update").addClass("hidden");
  tuduTask.find(".tudu-edit-cancel").addClass("hidden");
  tuduTask.find(".tudu-edit").removeClass("hidden");
  tuduTask.removeClass("edit-mode");
}

var CancellingTask = function(element){
  var tuDuTask = element.closest(".tudu-list-task");
  tuDuTask.find(".tudu-edit-cancel").addClass("hidden");
  tuDuTask.find(".tudu-update").addClass("hidden");
  tuDuTask.find(".tudu-edit").removeClass("hidden");
  tuDuTask.removeClass("edit-mode");
  tuDuTask.find(".tudu-edit-form").addClass("hidden");
  tuDuTask.find(".tudu-task").removeClass("hidden");
  tuDuTask.find(".tudu-edit-input").val(tuDuTask.find(".tudu-task").text());
}


var EditingTasks = function(){

//TuDu Edit Task Function
  //Edit Button Action
  $(".tudu-edit").on("click", function(){
    EditingTask($(this));
    console.log("clicked");
    // else{
    //   $(this).parent().parent().removeClass("edit-mode");
    //   console.log("removed")
    // }
  });

  //Double Click on Task to Edit Action
  $(".tudu-list-task").on("dblclick", function(){
    EditingTask($(this));
    console.log("double clicked");
  });


  //Cancel Button Action
  $(".tudu-edit-cancel").on("click", function(){
    CancellingTask($(this));
    console.log("cancel clicked");
  });

  //Cancel Task on Esc Key Action
  $(document).on("keydown", function(event){
    if(event.keyCode == 27){
      $(".edit-mode").each(function(){
        CancellingTask($(this));
        console.log("Esc Pressed");
      });
    }
  });


  //Update Button on Click Action
  $(".tudu-update").on("click", function(){
    UpdatingTask($(this));
    console.log("update clicked");
  });

  //Update Task on Enter Key Action
  $(".tudu-edit-input").on("keydown", function(event){
    if(event.keyCode == 13){
      if ($(this).closest(".tudu-list-task").hasClass("edit-mode")){
        UpdatingTask($(this));
        console.log("Enter Pressed");
      }
    }
  });

  //Delete Button Action
  $(".tudu-delete").on("click", function(){
    $(this).parent().parent().fadeOut(300);
    setTimeout(function(){
    $(this).parent().parent().remove();
    }, 350);
  });
}

EditingTasks();

  //TuDu Adding New Task
  $("#new_list").bind("ajax:complete", function(){
    var jsonUrl = "/lists.json";
    // Getting JSON to get the id of the newest task added
      $.getJSON(jsonUrl, function(data){
        console.log(data[0].id);
      $.ajax({
        url: "/lists/"+data[0].id,
        context: document.body,
        success: function(ajaxDataDocBody) {
          var item = $(ajaxDataDocBody).find(".tudu-list-task");
          $(".tudu-list").prepend(item);
          item.find(".tudu-task").hide().fadeIn(500);
          EditingTasks();
          $(".tudu-new-task-input").val("");
          orderSorted();

        }
      });
    });
  });
});











