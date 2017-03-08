define(["util", "detail", "gloader"], function(util, detail) {
  "use strict";

  function drawTable(devs) {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', ' ');
    dataTable.addColumn('string', 'ID');
    dataTable.addColumn('string', 'IP Address');
    dataTable.addColumn('string', 'Status');
    dataTable.addColumn('string', 'ITS Version');

    var len = devs.length;
      for (var ii = 0; ii < len; ++ii)
      {
        var dev = devs[ii];
        var font_color = dev.status === "available"? "green": "red";

        dataTable.addRows([
          ["<input type='checkbox' class='device-selector' value='"+JSON.stringify(dev)+"'/>", "<a href='#"+dev.device_id+"' class='id-column detail-link' style='width: 100%'>"+dev.device_id+"</a>",  dev.ipv4_address, "<span style='color: "+font_color+"'>"+dev.status+"</span>", dev.its_framework_version],
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
      util.pageLoad(util.pages.DETAIL, {dev_id: dev_id}, function() {
        detail.render({dev_id: dev_id});
      });
    });
  }

  function callback(resp) {
    var devs = resp.device_status;
    util.setDevStat(devs);
    drawTable(devs);
  }

  function refresh() {
    util.ajax(util.backendURLs.getCurrentDevStat, callback);
  }

  function unload(e) {
    $("#refresh-btn").off("click", refresh);
      $("button[name='upgrade-btn']").off("click", upgradeDevice);
  }

  function getSelectedDevices() {
    var devices = [];
    var dev;
    $("input.device-selector:checked").each(function() {
      dev = JSON.parse($(this).val());
      devices.push(dev)
    });
    return devices;
  }

  function upgradeDevice() {
    console.log(getSelectedDevices());
    var data = new util.backendURLs.upgradeDevice.data(devs, "13.0", "5-4.45");
    util.ajax(this.backendURLs.upgradeDevice, data, function(resp) {
      console.log(resp);
    });
  }

  function downgradeDevice() {
    var data = new util.backendURLs.downgradeDevice.data(devs, "13.0", "5-4.45");
    util.ajax(this.backendURLs.downgradeDevice, data, function(resp) {
      console.log(resp);
    });
  }

  function syncConfig() {
    var data = new util.backendURLs.syncConfig.data(devs, "13.0", "5-4.45");
    util.ajax(this.backendURLs.syncConfig, data, function(resp) {
      console.log(resp);
    });
  }

  function rebootDevice() {
    var data = new util.backendURLs.rebootDevice.data(devs, "13.0", "5-4.45");
    util.ajax(this.backendURLs.rebootDevice, data, function(resp) {
      console.log(resp);
    });
  }

  function changeItsFramework() {
    var data = new util.backendURLs.changeItsFramework.data(devs, "13.0", "5-4.45");
    util.ajax(this.backendURLs.changeItsFramework, data, function(resp) {
      console.log(resp);
    });
  }

  return {
    render: function() {
      google.charts.load('current', {'packages':['table']});


      var devs = util.lazyGetDevStat();

      if (!devs)
        util.ajax(util.backendURLs.getCurrentDevStat, callback);
      else 
        drawTable(devs);

      $("#refresh-btn").click(refresh);

      util.unloadCallback(unload);

      $("button[name='upgrade-btn']").click(upgradeDevice);
      $("button[name='downgrade-btn']").click(downgradeDevice);
      $("button[name='sync-btn']").click(function() {
        (util.confirm(syncConfig, "Are you sure to synchronize the configuration file(s)?"))();
      });
      $("button[name='reboot-btn']").click(function() {
        (util.confirm(rebootDevice, "Are you sure to reboot the device(s)?"))();
      });
      $("button[name='its-btn']").click(changeItsFramework);
    }
  }
});