define(["util", "detail", "gloader"], function(util, detail) {
  "use strict";

  function drawTable(devs) {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'ID');
    dataTable.addColumn('string', 'IP Address');
    dataTable.addColumn('string', 'Status');
    dataTable.addColumn('string', 'ITS Version');

    var len = devs.length;
    for (var jj = 0; jj < 30; ++jj)
    {
      for (var ii = 0; ii < len; ++ii)
      {
        var dev = devs[ii];
        var font_color = util.isOnline(dev)? "green": "red";

        dataTable.addRows([
          ["<a href='#"+dev.device_id+"' class='id-column detail-link'>"+dev.device_id+"</a>",  dev.ipv4_address, "<span style='color: "+font_color+"'>"+dev.status+"</span>", dev.its_framework_version],
        ]);
          
      }


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
    }
  }
});
