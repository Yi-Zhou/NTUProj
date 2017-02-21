<div class="dashboard-container">
  <div class="dashboard-wrapper">
    <script type="text/javascript">
    function drawCharts(resp) {
      google.charts.load('current', {'packages':['corechart', 'table']});
      google.charts.setOnLoadCallback(drawChart);
      google.charts.setOnLoadCallback(drawTable);

      console.log(resp);
      var len = resp.device_status.length;
      var devs = resp.device_status;
      var rsu_online_num = 0, rsu_offline_num = 0;
      var obu_online_num = 0, obu_offline_num = 0;
      for (var i = 0; i < len; ++i)
      {
        var dev = devs[i];
        if (dev.status === "available" && dev.device_type === "RSU") 
          rsu_online_num++;
        else if (dev.device_type === "RSU") 
          rsu_offline_num++;
        else if (dev.status === "available" && dev.device_type === "OBU") 
          obu_online_num++;
        else if (dev.device_type === "OBU") 
          obu_offline_num++;
      }

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['somewhat', 'somehow'],
          ['RSU Online',   rsu_online_num],
          ['OBU Online',   obu_online_num],
          ['RSU Offline',  rsu_offline_num],
          ['OBU Offline',  obu_offline_num],
        ]);

        var options = {
          title: 'Availability of Devices at '+new Date().toLocaleString(),
          width: '40rem',
          height: '30rem',
          pieSliceText: 'value-and-percentage',
          colors: ["#0085ff", "#4ca9ff", "#ff7400", "#ff4d00"],
          backgroundColor: {fill: "#fefefe"}
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Device Type');
        data.addColumn('number', 'Online');
        data.addColumn('number', 'Offline');
        data.addRows([
          ['RSU', rsu_online_num, rsu_offline_num],
          ['OBU', obu_online_num, obu_offline_num]
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
      if (google.visualization) {
        drawChart();
        drawTable();
      }

    }
    ajax(backendURLs.getDevStat, drawCharts);
    $("#refresh-btn").click(function() {
      ajax(backendURLs.getCurrentDevStat, drawCharts);
    });
    </script>
    <div id="piechart" style="width: 40rem; height: 30rem;"></div>
    <button id="refresh-btn">Refresh</button>
    <div id="table_div" style="width: 50%"></div>
  </div>
</div>