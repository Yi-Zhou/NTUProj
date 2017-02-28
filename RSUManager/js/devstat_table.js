define(["util", "detail", "gloader"], function(util, detail) {
  return {
    execute: function() {
      google.charts.load('current', {'packages':['table']});
      function drawTable(devs) {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'ID');
        dataTable.addColumn('string', 'IP Address');
        dataTable.addColumn('string', 'Status');
        dataTable.addColumn('string', 'ITS Version');

        var len = devs.length;
        for (var ii = 0; ii < len; ++ii)
        {
          var dev = devs[ii];
          dataTable.addRows([
            ["<a href='#"+dev.device_id+"' class='detail-link'>"+dev.device_id+"</a>",  dev.ipv4_address, dev.status, dev.its_framework_version],
          ]);
            
        }

        var table = new google.visualization.Table(document.getElementById('devstat-table'));

        var options = {
          allowHtml: true,
          showRowNumber: false, 
          width: "100%", 
          height: "100%"
        }

        table.draw(dataTable, options);

        $(".detail-link").click(function() {
          var dev_id = this.text;
          util.pageLoad(util.pages.DETAIL, {dev_id: dev_id}, function() {
            detail.execute({dev_id: dev_id});
          });
        });
      }

      function callback(resp) {
        var devs = resp.device_status;
        util.setDevStat(devs);
        drawTable(devs);
      }

      var devs = util.lazyGetDevStat();

      if (!devs)
        util.ajax(util.backendURLs.getCurrentDevStat, callback);
      else 
        drawTable(devs);

      $("#devstat-table-refresh-btn").click(function() {
        util.ajax(util.backendURLs.getCurrentDevStat, callback);
      });

    }
  }
});
