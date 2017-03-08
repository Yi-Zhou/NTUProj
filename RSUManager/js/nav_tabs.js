define(["util", "devstat_table", "dashboard", "operations", "events"], function(util, devstat_table, dashboard, operations, events) {
  "use strict";

  function nav_click(_this, nav_name) {
    $("."+nav_name+"-item.active").removeClass("active");
    $(_this).addClass("active");
  }

  return {
    render: function() {
      $("#tab-devstat").click(function() {
        util.pageLoad(util.pages.DEV_STATUS, function() {
          devstat_table.render();
        });
      });

      $("#tab-dashbrd").click(function() {
        util.pageLoad(util.pages.DASHBOARD, function() {
          dashboard.render();
        });
      });
      $("#tab-ops").click(function() {
        util.pageLoad(util.pages.OPERATIONS, function() {
          operations.render();
        });
      });
      $("#tab-events").click(function() {
        util.pageLoad(util.pages.EVENTS, function() {
          events.render();
        });
      });
      $(".tab-item").click(function() {nav_click(this, "tab")});
      $("#tab-dashbrd").click();
    }
  }
});