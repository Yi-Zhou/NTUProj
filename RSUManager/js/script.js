var rsu_id;

function randomStatus() {
  return Math.floor(Math.random()*2) === 0? "<span class='font-alert'>Not Available</span>": 
  "<span class='font-pass'>Available</span>";
}

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
    $("#rsu-list").append(`
    <a href="#" class="sidebar-item">RSU`+ii+`</a>
    `);

  for (var ii=0; ii < 33; ++ii)
    $("#obu-list").append(`
      <a href="#" class="sidebar-item">OBU`+ii+`</a>
    `);

  var $items = $(".sidebar-item.expandable");
  $items.click(function(e) {
    var $ele = $(e.target);
    $ele.next().toggle();
    $ele.children(".list-arrow").toggleClass("glyphicon-triangle-bottom");
  });
  var $subitems = $(".sidebar-sublist .sidebar-item");
  var len = $subitems.length;
  console.log(len);
  $("#search-input").on("input", function(e) {
    // search logic
    console.log($subitems);
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
      $(".list-arrow").removeClass("glyphicon-triangle-bottom");
    }

    for (var ii = 0; ii < len; ++ii)
    {
      var ele = $subitems[ii];
      console.log(ele.text);
      if (ele.text.toUpperCase().indexOf(this.value.toUpperCase()) < 0) ele.style.display = "none";
      else ele.style.display = "block";
    }
  });
  $("#search-clear-btn").click(function() {
    // clear search field
    $("#search-input").val("");
    console.log($subitems);
    for (var ii = 0; ii < len; ++ii) $subitems[ii].style.display = "";
  });

  $(".sidebar-sublist .sidebar-item").click(function (e) {
    $(".table-container").hide();
    $(".main-container").show();
    var $ele = $(e.target);
    rsu_id = $ele.text();
    $(".detail-wrapper").empty().prepend(`
        <h1>`+rsu_id+`</h1>
        <div class="detail-attr-wrapper">
          <ul class="detail-attr-list">
            <li><span class="attr"><strong>Attribute 1:</strong></span> <span class="val">`+rsu_id+`.Value1<span></li>
            <li><span class="attr"><strong>Attr 3:</strong></span> <span class="val">`+rsu_id+`.Value2</span></li>
            <li><span class="attr"><strong>Attrib 2:</strong></span> <span class="val">`+rsu_id+`.Value3</span></li>
            <li><span class="attr"><strong>Attri 4:</strong></span> <span class="val">`+rsu_id+`.Value4</span></li>
            <li><span class="attr"><strong>Attribute 5:</strong></span> <span class="val">`+rsu_id+`.Value5</span></li>
          </ul>
        </div>
        <div class="location-map"><img src="img/map_dummy.png" class="map" alt=""></div>
    `);
  });

  $(".rsu-table thead").append(`
    <tr>
      <th>ID</th>
      <th>Attribute 1</th>
      <th>Attribute 2</th>
      <th>Attribute 3</th>
      <th>Attribute 4</th>
      <th>Availability</th>
    </tr>
  `);

  for (var ii = 0; ii < 64; ++ii) {
    $(".rsu-table tbody").append(`
      <tr>
        <td><a href="#">RSU`+ii+`</a></td>
        <td>RSU`+ii+`.Value1</td>
        <td>RSU`+ii+`.Value2</td>
        <td>RSU`+ii+`.Value3</td>
        <td>RSU`+ii+`.Value4</td>
        <td>`+randomStatus()+`</td>

      </tr>`
    );
  }
  for (var ii = 0; ii < 33; ++ii) {
    $(".rsu-table tbody").append(`
      <tr>
        <td><a href="#">OBU`+ii+`</a></td>
        <td>OBU`+ii+`.Value1</td>
        <td>OBU`+ii+`.Value2</td>
        <td>OBU`+ii+`.Value3</td>
        <td>OBU`+ii+`.Value4</td>
        <td>`+randomStatus()+`</td>
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
  confirm("Are you sure you want to reboot RSU"+rsu_id+"?");
}

function sync() {
  confirm("Are you sure you want to synchronize configuration files on this device?");
}