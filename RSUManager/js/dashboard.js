define(["util", "gloader"], function(util) {
  return {
    execute: function() {

      function drawChart(values) {

        var data = google.visualization.arrayToDataTable([
          ['somewhat', 'somehow'],
          ['RSU Online',   values.rsu_online_num],
          ['OBU Online',   values.obu_online_num],
          ['RSU Offline',  values.rsu_offline_num],
          ['OBU Offline',  values.obu_offline_num],
        ]);

        var options = {
          title: 'Availability of Devices at '+new Date().toLocaleString(),
          width: '40rem',
          height: '30rem',
          pieSliceText: 'value-and-percentage',
          colors: ["#0085ff", "#4ca9ff", "#ff7400", "#ff4d00"],
          backgroundColor: {fill: "#fefefe"}
        };

        console.log(document.getElementById("piechart"));
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

      function drawTable(values) {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Device Type');
        data.addColumn('number', 'Online');
        data.addColumn('number', 'Offline');
        data.addRows([
          ['RSU', values.rsu_online_num, values.rsu_offline_num],
          ['OBU', values.obu_online_num, values.obu_offline_num]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        var options = {
          showRowNumber: false, 
          sort: "disable",
          width: "100%", 
          height: "100%"
        }

        table.draw(data, options);
      }

      function drawCharts(devs) {
        google.charts.load('current', {'packages':['corechart', 'table']});

        console.log(devs);
        var len = devs.length;
        var values = {
          rsu_online_num:  0,
          rsu_offline_num: 0,
          obu_online_num:  0,
          obu_offline_num: 0
        }
        for (var i = 0; i < len; ++i)
        {
          var dev = devs[i];
          if (dev.status === "available" && dev.device_type === "RSU") 
            values.rsu_online_num++;
          else if (dev.device_type === "RSU") 
            values.rsu_offline_num++;
          else if (dev.status === "available" && dev.device_type === "OBU") 
            values.obu_online_num++;
          else if (dev.device_type === "OBU") 
            values.obu_offline_num++;
        }
        if (google.visualization) {
          drawChart(values);
          drawTable(values);
        }

        google.charts.setOnLoadCallback(function() {
          drawChart(values);
        });
        google.charts.setOnLoadCallback(function() {
          drawTable(values);
        });
      }

      var devstat = util.lazyGetDevStat();
      console.log(devstat);

      function callback (resp) {
        console.log(resp);
        util.setDevStat(resp.device_status);
        drawCharts(resp.device_status);
      }

      if (!devstat)
      {
        console.log("load failed");
        util.ajax(util.backendURLs.getCurrentDevStat, callback);
      }
      else 
        drawCharts(devstat);

      $("#dashboard-refresh-btn").click(function() {
        util.ajax(util.backendURLs.getCurrentDevStat, callback);
      });
    }
  }
})
