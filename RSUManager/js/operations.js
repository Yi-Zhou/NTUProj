define(["util", "detail", "dev_control", "gloader"], function(util, detail, dev_control) {
  "use strict";

  function drawTable(devs) {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', ' ');
    dataTable.addColumn('string', 'Device ID');
    dataTable.addColumn('string', 'Type');
    dataTable.addColumn('string', 'MAC Address');
    dataTable.addColumn('string', 'IPv4 Address');
    dataTable.addColumn('string', 'IPv6 Address');
    dataTable.addColumn('string', 'Active Image');
    dataTable.addColumn('string', 'Image Version');
    dataTable.addColumn('string', 'ITS Version');
    dataTable.addColumn('string', 'Status');
    dataTable.addColumn('string', 'Timestamp');
    dataTable.addColumn('string', 'Config Path');

    var len = devs.length;
      for (var ii = 0; ii < len; ++ii)
      {
        var dev = devs[ii];
        var font_color = util.isOnline(dev)? "green": "red";

        dataTable.addRows([
          ["<input type='checkbox' class='device-selector' value='"+JSON.stringify(dev)+"'/>", "<a href='#"+dev.device_id+"' device_type='"+dev.device_type+"' class='id-column detail-link'>"+dev.device_id+"</a>", dev.device_type, dev.device_mac, dev.ipv4_address, dev.ipv6_address, dev.active_image, dev.image_version, dev.its_framework_version, "<span style='color: "+font_color+"'>"+dev.status+"</span>", dev.timestamp, dev.app_config_path],
        ]);
      }
    var table = new google.visualization.Table(document.getElementById('devstat-table-ops'));

    var options = {
      allowHtml: true,
      showRowNumber: false, 
      width: "100%", 
      height: "100%"
    }

    table.draw(dataTable, options);

    $(".id-column.detail-link").click(function() {
      var dev_id = this.text;
      var device_type = this.getAttribute("device_type");
      util.pageLoad(util.pages.DETAIL, function() {
        detail.render({device_id: dev_id, device_type: device_type});
      });
      $(".tab-item.active").removeClass("active");
    });

    var $tr = $(".google-visualization-table-table tr");
    $tr.click(function(event) {
      $(this).find("input.device-selector").click();
    });
    $tr.find("input.device-selector").click(function() {
      $(this).click();
    });

  }

  function callback(resp) {
    var devs = resp.device_status;
    util.setDevStat(devs);
    google.charts.setOnLoadCallback(function() {
      drawTable(devs);
    });
  }

  function refresh() {
    util.ajax(util.backendURLs.getCurrentDevStat, callback);
  }

  function unload(e) {
    $("#refresh-btn").show();
    dev_control.unload();
  }

  function loadCallback() {

  }

  return {
    render: function() {
      google.charts.load('current', {'packages':['table']});


      var devs = util.lazyGetDevStat();

      if (!devs)
        util.ajax(util.backendURLs.getCurrentDevStat, callback);
      else 
      {
        google.charts.setOnLoadCallback(function() {
          drawTable(devs);
        });

      }

      $("#refresh-btn").hide();

      util.unloadCallback(unload);

      util.pageLoad(util.pages.DEV_CONTROL, "nav.ops-wrapper", function() {
        dev_control.render();
      });
    }
  }
});