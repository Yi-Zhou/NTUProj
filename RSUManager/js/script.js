var rsu_id;
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
      $("section.sidebar").css("width", e.pageX);
      $(".main-container, .table-container").css("padding-left", e.pageX);
    }
  });
  for (var ii = 0; ii < 64; ++ii)
  $(".sidebar-list").append(`
    <a href="index.html?id=`+ii+`" class="sidebar-item">RSU`+ii+`</a>
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
    console.log($items);
    for (var ii = 0; ii < len; ++ii) $items[ii].style.display = "";
  });

  var cur_url = location.href;
  if (cur_url.indexOf("id=") > -1) {
    $(".table-container").hide();
    $(".main-container").show();
    rsu_id = location.href.substring(location.href.indexOf("id=")+3);
    $(".detail-wrapper").prepend(`
        <h1>RSU`+rsu_id+`</h1>
        <div class="detail-attr-wrapper">
          <ul class="detail-attr-list">
            <li><span class="attr"><strong>Attribute 1:</strong></span> <span class="val">RSU`+rsu_id+`.Value1<span></li>
            <li><span class="attr"><strong>Attr 3:</strong></span> <span class="val">RSU`+rsu_id+`.Value2</span></li>
            <li><span class="attr"><strong>Attrib 2:</strong></span> <span class="val">RSU`+rsu_id+`.Value3</span></li>
            <li><span class="attr"><strong>Attri 4:</strong></span> <span class="val">RSU`+rsu_id+`.Value4</span></li>
            <li><span class="attr"><strong>Attribute 5:</strong></span> <span class="val">RSU`+rsu_id+`.Value5</span></li>
          </ul>
        </div>
        <div class="location-map"><img src="img/map_dummy.png" class="map" alt=""></div>
    `);
  }
  else {
    $(".main-container").hide();
    console.log("hide");
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
        <td><a href="index.html?id=`+ii+`">RSU`+ii+`</a></td>
        <td>RSU`+ii+`.Value1</td>
        <td>RSU`+ii+`.Value2</td>
        <td>RSU`+ii+`.Value3</td>
        <td>RSU`+ii+`.Value4</td>
        <td>RSU`+ii+`.Value5</td>
      </tr>`
    );
  }

  $uploadForm = $("form.upload-form");

  $("button.upgrade, button.downgrade").click(function() {
    $uploadForm.slideToggle(200);
  });

  $uploadForm.on("submit", function(e) {
    e.preventDefault();
    console.log("here");
    $uploadForm.slideToggle(200);
  })
});

function reboot() {
  confirm("Are you sure to reboot RSU"+rsu_id+"?");
}

