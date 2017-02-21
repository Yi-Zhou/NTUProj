<form class="search-form">
  <input type="search" id="search-input" placeholder="Search..." autocomplete="off" />
  <span class="glyphicon glyphicon-search search-glyphicon"></span>
  <button class="clear-btn" id="search-clear-btn" onclick="return false">
    <span class="glyphicon glyphicon-remove clear-glyphicon"></span>
  </button>
</form>
<h4 class="sidebar-title">Devices</h4>
<div class="sidebar-list">
  <div class="sidebar-item expandable" id="rsu-list-expander">
    <span class="glyphicon glyphicon-triangle-right list-arrow"></span> RSU
  </div>
  <div id="rsu-list" class="sidebar-sublist">
  </div>
  <div class="sidebar-item expandable" id="obu-list-expander">
    <span class="glyphicon glyphicon-triangle-right list-arrow"></span> OBU
  </div>
  <div id="obu-list" class="sidebar-sublist">
  </div>
</div>
<script>
$(function() {
  "use strict";

  var $items = $(".sidebar-item.expandable");
  $items.click(function(e) {
    var $ele = $(e.target);
    $ele.next().toggle();
    $ele.toggleClass("expanded");
    $ele.children(".list-arrow").toggleClass("glyphicon-triangle-bottom");
  });
  var $subitems = $(".sidebar-sublist .sidebar-item");
  var len = $subitems.length;
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

    for (var ii = 0; ii < len; ++ii)
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
    console.log($(".expandable.expanded").next().html());
    $(".expandable").next().hide();
    $(".expandable.expanded").next().show();
    $("#search-clear-btn").hide();
    for (var ii = 0; ii < len; ++ii)
      $subitems[ii].style.display = "";
  });

  var devs;
  var devs_dict = {};
  ajax(backendURLs.getDevStat, function (data) {
    devs = data.device_status;
    var len = devs.length;
    for (var ii = 0; ii < len; ++ii) {
      var dev = devs[ii];
      var dev_id = dev.device_id;
      devs_dict[dev.device_id] = dev;
      var ele = "<a href='#"+dev_id+"' class='sidebar-item detail-link'>"+dev_id+"</a>";
      if (dev.device_type === "RSU")
        $("#rsu-list").append(ele);
      else if (dev.device_type === "OBU")
        $("#obu-list").append(ele);
      console.log("there");
    }
    $(".detail-link").click(function() {
      console.log("here");
      $(".tab-item.active").removeClass("active");
      pageLoad(pages.DETAIL, devs_dict[this.text]);
    });
  });
});
</script>