var dev_id;

$(function() {

  function bindDetailLink(e) {
    $(".table-container").hide();
    $(".main-container").show();
    var $ele = $(e.target);
    dev_id = $ele.text();
    $.get("detail.php", {dev_id: dev_id}, function (data) {
      $(".detail-container").html(data);
    })

  }

  $(".detail-link").click(bindDetailLink);

  var resizerActive = false;
  $(".resizer").mousedown(function(e) {
    resizerActive = true;
    console.log("down");
  });
  $(".resizer").mouseup(function(e) {
    resizerActive = false;
    console.log("up");
  });
  $(".resizer").on("drag", function(e) {
    if (e.pageX > 180 && e.pageX < 600)
    {
      $(".resizer").css("left", e.pageX);
      $("section.sidebar").css("width", e.pageX);
      $(".main-container, .table-container").css("padding-left", e.pageX);
      $(".nav-tabs").css("left", e.pageX);
    }
  });

  $uploadForm = $("form.upload-form");

  $("button.upgrade, button.downgrade").click(function() {
    $uploadForm.slideToggle(200);
  });

  $uploadForm.on("submit", function(e) {
    e.preventDefault();
    console.log("here");
    $uploadForm.slideToggle(200);
  });

});

function reboot() {
  confirm("Are you sure you want to reboot "+dev_id+"?");
}

function sync() {
  confirm("Are you sure you want to synchronize configuration files on "+dev_id+"?");
}