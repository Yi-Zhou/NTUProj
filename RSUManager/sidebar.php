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
    <?php
    for ($ii = 0; $ii < 64; ++$ii)
      echo "<a href='#rsu$ii' class='sidebar-item detail-link'>RSU$ii</a>";
    ?>
  </div>
  <div class="sidebar-item expandable" id="obu-list-expander">
    <span class="glyphicon glyphicon-triangle-right list-arrow"></span> OBU
  </div>
  <div id="obu-list" class="sidebar-sublist">
  <?php
    for ($ii = 0; $ii < 33; ++$ii)
      echo "<a href='#obu$ii' class='sidebar-item detail-link'>OBU$ii</a>";
  ?>
  </div>
</div>
<script>
$(function() {

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
    $(".sidebar-sublist").hide();
    $("#search-clear-btn").hide();
    for (var ii = 0; ii < len; ++ii)
      $subitems[ii].style.display = "";
    $(".bookmark-item.active").click();
  });
});
</script>