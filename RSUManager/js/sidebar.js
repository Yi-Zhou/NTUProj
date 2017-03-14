define(["jquery", "util", "detail"], function($, util, detail) {
  "use strict";
  return {
    render: function() {
      var $subitems; 
      var dev_num; 

      function callback (devs) {
        console.log(devs);

        var len = devs.length;
        for (var ii = 0; ii < len; ++ii) {
          var dev = devs[ii];
          var dev_id = dev.device_id;
          var ele = "<a href='#"+dev_id+"' class='sidebar-item detail-link'>"+dev_id+"</a>";
          if (dev.device_type === "RSU")
            $("#rsu-list").append(ele);
          else if (dev.device_type === "OBU")
            $("#obu-list").append(ele);
        }
        $(".detail-link").click(function() {
          $(".tab-item.active").removeClass("active");
          var dev_id = this.text;
          util.pageLoad(util.pages.DETAIL, {dev_id: dev_id}, function() {
            detail.render({dev_id: dev_id});
          });
        });
        var $items = $(".sidebar-item.expandable");
        $items.click(function(e) {
          var $ele = $(e.target);
          $ele.next().toggle();
          $ele.toggleClass("expanded");
          $ele.children(".list-arrow").toggleClass("glyphicon-triangle-bottom");
        });
        $subitems = $(".sidebar-sublist .sidebar-item");
        dev_num = $subitems.length;
      }

      var devs = util.lazyGetDevStat();
      if (!devs) {
        util.ajax(util.backendURLs.getCurrentDevStat, function(data) {
          util.setDevStat(data.device_status);
          callback(data.device_status);
        });
      }
      else callback(devs);

      $("#search-input").on("input", function(e) {
        // search logic
        if (this.value) 
        {
          $(".sidebar-item.expandable").hide();
          $("#search-clear-btn").show();
          $(".sidebar-sublist").show();
        }
        else 
        {
          $(".sidebar-item.expandable").show();
          $(".sidebar-sublist").hide();
          $("#search-clear-btn").hide();
        }

        for (var ii = 0; ii < dev_num; ++ii)
        {
          var ele = $subitems[ii];
          if (ele.text.toUpperCase().indexOf(this.value.toUpperCase()) < 0) ele.style.display = "none";
          else ele.style.display = "";
        }
      });
      $("#search-clear-btn").click(function() {
        // clear search field
        $("#search-input").val("");
        $(".sidebar-item.expandable").show();
        $(".expandable").next().hide();
        $(".expandable.expanded").next().show();
        $("#search-clear-btn").hide();
        for (var ii = 0; ii < dev_num; ++ii)
          $subitems[ii].style.display = "";
      });

    }
  }
});