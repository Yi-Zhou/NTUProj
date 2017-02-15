var dev_id;

function randomStatus() {
  return Math.floor(Math.random()*2) === 0? "<span class='font-alert'>Not Available</span>": 
  "<span class='font-pass'>Available</span>";
}

$(function() {
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
    if (e.pageX > 180 && e.pageX < 600)
    {
      $(".resizer").css("left", e.pageX);
      $(".sidebar-list").css("width", e.pageX);
      $("section.sidebar").css("width", e.pageX);
      $(".main-container, .table-container").css("padding-left", e.pageX);
      $(".nav-tabs").css("left", e.pageX);
    }
  });
  for (var ii = 0; ii < 64; ++ii)
    $("#rsu-list").append(`
    <a href="#rsu`+ii+`" class="sidebar-item detail-link">RSU`+ii+`</a>
    `);

  for (var ii=0; ii < 33; ++ii)
    $("#obu-list").append(`
      <a href="#obu`+ii+`" class="sidebar-item detail-link">OBU`+ii+`</a>
    `);

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

  $(".rsu-table thead").append(`
    <tr>
      <th><a href="#">ID</a></th>
      <th><a href="#">Attribute 1</a></th>
      <th><a href="#">Attribute 2</a></th>
      <th><a href="#">Attribute 3</a></th>
      <th><a href="#">Availability</a></th>
    </tr>
  `);

  for (var ii = 0; ii < 64; ++ii) {
    $(".rsu-table tbody").append(`
      <tr>
        <td><a href="#" class="detail-link">RSU`+ii+`</a></td>
        <td>RSU`+ii+`.Value1</td>
        <td>RSU`+ii+`.Value2</td>
        <td>RSU`+ii+`.Value3</td>
        <td>`+randomStatus()+`</td>

      </tr>`
    );
  }
  for (var ii = 0; ii < 33; ++ii) {
    $(".rsu-table tbody").append(`
      <tr>
        <td><a href="#" class="detail-link">OBU`+ii+`</a></td>
        <td>OBU`+ii+`.Value1</td>
        <td>OBU`+ii+`.Value2</td>
        <td>OBU`+ii+`.Value3</td>
        <td>`+randomStatus()+`</td>
      </tr>`
    );
  }

  $(".detail-link").click(function (e) {
    $(".table-container").hide();
    $(".main-container").show();
    var $ele = $(e.target);
    dev_id = $ele.text();
    $(".detail-wrapper").empty().prepend(`
        <h1>`+dev_id+`</h1>
        <div class="detail-attr-wrapper">
          <ul class="detail-attr-list">
            <li><span class="attr"><strong>Attribute 1:</strong></span> <span class="val">`+dev_id+`.Value1<span></li>
            <li><span class="attr"><strong>Attr 3:</strong></span> <span class="val">`+dev_id+`.Value2</span></li>
            <li><span class="attr"><strong>Attrib 2:</strong></span> <span class="val">`+dev_id+`.Value3</span></li>
            <li><span class="attr"><strong>Attri 4:</strong></span> <span class="val">`+dev_id+`.Value4</span></li>
            <li><span class="attr"><strong>Attribute 5:</strong></span> <span class="val">`+dev_id+`.Value5</span></li>
          </ul>
        </div>
        <div class="location-map"><img src="img/map_dummy.png" class="map" alt=""></div>
    `);
  });


  $uploadForm = $("form.upload-form");

  $("button.upgrade, button.downgrade").click(function() {
    $uploadForm.slideToggle(200);
  });

  $uploadForm.on("submit", function(e) {
    e.preventDefault();
    console.log("here");
    $uploadForm.slideToggle(200);
  });

  function nav_click(_this, nav_name) {
    $("."+nav_name+"-item.active").removeClass("active");
    console.log(_this);
    $(_this).addClass("active");
  }

  $(".bookmark-item").click(function() {nav_click(this, "bookmark")});

  $("#bookmark-overview").click(function() {
    $("#rsu-list-expander").show();
    $("#obu-list-expander").show();
    if ($("#rsu-list-expander").hasClass("expanded")) {
      $("#rsu-list").show();
    }
    if ($("#obu-list-expander").hasClass("expanded")) {
      $("#obu-list").show();
    }
  });

  $("#bookmark-rsu").click(function() {
    $("#obu-list").hide();
    $("#obu-list-expander").hide();
    $("#rsu-list-expander").show();
    if ($("#rsu-list-expander").hasClass("expanded")) {
      $("#rsu-list").show();
    }
  });

  $("#bookmark-obu").click(function() {
    $("#rsu-list").hide();
    $("#rsu-list-expander").hide();
    $("#obu-list-expander").show();
    if ($("#obu-list-expander").hasClass("expanded")) {
      $("#obu-list").show();
    }
  }); 

  $(".tab-item").click(function() {nav_click(this, "tab")});

});

function reboot() {
  confirm("Are you sure you want to reboot "+dev_id+"?");
}

function sync() {
  confirm("Are you sure you want to synchronize configuration files on "+dev_id+"?");
}