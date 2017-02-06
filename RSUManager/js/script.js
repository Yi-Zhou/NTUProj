$(function() {
  console.log($(".resizer"));
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
    if (e.pageX > 150 && e.pageX < 600)
    {
      $(".resizer").css("left", e.pageX);
      $(".sidebar-list").css("width", e.pageX);
      $(".table-container").css("padding-left", e.pageX);
      $("section.sidebar").css("width", e.pageX);
    }
  });
  for (var ii = 0; ii < 64; ++ii)
  $(".sidebar-list").append(`
    <a href="index.html?`+ii+`" class="sidebar-item">RSU`+ii+`</a>
  `);

  var $items = $(".sidebar-item");
  var len = $items.length;
  $("#search-input").on("input", function(e) {
    if (this.value) $("#search-clear-btn").show();
    else $("#search-clear-btn").hide();
    for (var ii = 0; ii < len; ++ii)
    {
      var ele = $items[ii];
      if (ele.text.toUpperCase().indexOf(this.value.toUpperCase()) < 0) ele.style.display = "none";
      else ele.style.display = "";
    }
  });
  $("#search-clear-btn").click(function() {
    $("#search-input").val("");
    $(this).hide();
    for (var ii = 0; ii < len; ++ii) $items[ii].style.display = "";
  });

  var cur_url = location.href;
  if (cur_url.indexOf("?") > -1) {
    $(".table-container").hide();
    var rsu_id = location.href.substring(location.href.indexOf("?")+1);
    console.log(rsu_id);
  }

  $(".rsu-table thead").append(`
    <tr>
      <th>ID</th>
      <th>Attribute 1</th>
      <th>Attribute 2</th>
      <th>Attribute 3</th>
      <th>Attribute 4</th>
      <th>Attribute 5</th>
    </tr>
  `);

  for (var ii = 0; ii < 64; ++ii) {
    $(".rsu-table tbody").append(`
      <tr>
        <td><a href="index.html?`+ii+`">RSU`+ii+`</a></td>
        <td>RSU`+ii+`.Value1</td>
        <td>RSU`+ii+`.Value2</td>
        <td>RSU`+ii+`.Value3</td>
        <td>RSU`+ii+`.Value4</td>
        <td>RSU`+ii+`.Value5</td>
      </tr>`
    );
  }

});