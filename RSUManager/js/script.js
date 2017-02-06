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
    <a href="#" class="sidebar-item">RSU`+ii+`</a>
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

  for (var ii = 0; ii < 64; ++ii) {
    $(".rsu-table tbody").append(`
      <tr>
        <td>RSU`+ii+`</td>
        <td>Value 1</td>
        <td>Value 2</td>
        <td>Value 3</td>
        <td>Value 4</td>
        <td>Value 5</td>
      </tr>`
    );
  
  }
});