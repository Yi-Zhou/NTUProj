<div class="tabs-wrapper">
  <ul class="tabs">
    <li id="tab-dashbrd" class="tab-item active"><a href="#">Dashboard</a></li>
    <li id="tab-devstat" class="tab-item"><a href="#">Device Status</a></li>
    <li id="tab-ops" class="tab-item"><a href="#">Operations</a></li>
    <li id="tab-events" class="tab-item"><a href="#">Events</a></li>
  </ul>
</div>
<script type="text/javascript">

  function nav_click(_this, nav_name) {
    $("."+nav_name+"-item.active").removeClass("active");
    $(_this).addClass("active");
  }

  $(".tab-item").click(function() {nav_click(this, "tab")});
  
</script>