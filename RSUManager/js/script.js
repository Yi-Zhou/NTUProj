define(["util", "sidebar", "nav_tabs"], function(util, sidebar, nav_tabs) {
  "use strict";
  var dev_id;

  util.storage.init();

  $(function() {
    $("#main-header").load("header.html");
    $("#main-sidebar").load("sidebar.html", function() {
      sidebar.render();
    });
    $("#nav-tabs").load("nav_tabs.html", function() {
      nav_tabs.render();
    });

    var cur_width = '24rem'
    var resizerActive = false;
    $(".resizer").mousedown(function(e) {
      resizerActive = true;
    });
    $(".resizer").mouseup(function(e) {
      resizerActive = false;
    });
    $(".resizer").on("drag", function(e) {
      if (e.pageX > 180 && e.pageX < 600)
      {
        cur_width = e.pageX;
        $(".resizer").css("left", e.pageX);
        $("section.sidebar").css("width", e.pageX);
        $(".main-container").css("padding-left", e.pageX);
        $(".nav-tabs").css("left", e.pageX).css("width", "100%").css("width", "-="+e.pageX);
      }
    });
    $(window).resize(function() {
      $(".nav-tabs").css("width", "100%").css("width", "-="+cur_width);
    })

    var $uploadForm = $("form.upload-form");

    $("button.upgrade, button.downgrade").click(function() {
      $uploadForm.slideToggle(200);
    });

    $uploadForm.on("submit", function(e) {
      e.preventDefault();
      console.log("here");
      $uploadForm.slideToggle(200);
    });

  });
});
