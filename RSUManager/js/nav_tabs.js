define(["util", "devstat_table", "dashboard"], function(util, devstat_table, dashboard) {
  "use strict";
  return {
    execute: function() {
      $("#tab-devstat").click(function() {
        util.pageLoad(util.pages.DEV_STATUS, function() {
          devstat_table.execute();
        });
      });

      $("#tab-dashbrd").click(function() {
        util.pageLoad(util.pages.DASHBOARD, function() {
          dashboard.execute();
        });
      });

      function nav_click(_this, nav_name) {
        $("."+nav_name+"-item.active").removeClass("active");
        $(_this).addClass("active");
      }

      $(".tab-item").click(function() {nav_click(this, "tab")});
      $("#tab-dashbrd").click();
    }
  }
});