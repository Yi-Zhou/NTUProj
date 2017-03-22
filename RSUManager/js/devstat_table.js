define(["util", "detail", "gloader"], function(util, detail) {
  "use strict";

  var devs;

  function drawTable(devs) {
    var dataTable = new google.visualization.DataTable();
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
        ["<a href='#"+dev.device_id+"' device_type='"+dev.device_type+"' class='id-column detail-link'>"+dev.device_id+"</a>", dev.device_type, dev.device_mac, dev.ipv4_address, dev.ipv6_address, dev.active_image, dev.image_version, dev.its_framework_version, "<span style='color: "+font_color+"'>"+dev.status+"</span>", dev.timestamp, dev.app_config_path],
      ])
    }

    var table = new google.visualization.Table(document.getElementById('devstat-table'));

    var options = {
      allowHtml: true,
      showRowNumber: false, 
      width: "100%", 
      height: "100%"
    }

    table.draw(dataTable, options);

    $(".id-column.detail-link").click(function() {
      var device_id = this.text;
      var device_type = this.getAttribute("device_type");
      util.pageLoad(util.pages.DETAIL, {device_id: device_id, device_type: device_type}, function() {
        detail.render({device_id: device_id, device_type: device_type});
      });
      $(".tab-item.active").removeClass("active");
    });
  }

  function callback(resp) {
    var devs = resp.device_status;
    util.setDevStat(devs);
    drawTable(devs);
  }

  var timeout_id;
  function refresh_callback(dev) {
    console.log(dev);
    return function(resp) {
      clearTimeout(timeout_id);
      console.log(dev);
      console.log(resp.device_status);
      $.extend(dev, resp.device_status[0]);
      util.setDevStat(devs);
      $("#refresh-btn span").addClass("spinner");
      timeout_id = setTimeout(function() {
        drawTable(devs);
        $("#refresh-btn span").removeClass("spinner");
      }, 50);;
    }
  }

  function refresh() {
    var len = devs.length;
    var dev;
    for (var ii = 0; ii < len; ii++) {
      dev = devs[ii];
      util.ajax(util.backendURLs.getCurrentDevStat, {device_id: dev.device_id, device_type: dev.device_type},      refresh_callback(dev));
    }
  }

  function unload(e) {
    $("#refresh-btn").off("click", refresh);
  }

  return {
    render: function() {
      google.charts.load('current', {'packages':['table']});


      devs = util.lazyGetDevStat();

      if (!devs)
        util.ajax(util.backendURLs.getDevStat, callback);
      else 
        drawTable(devs);

      $("#refresh-btn").click(refresh);

      util.unloadCallback(unload);
    }
  }
});
