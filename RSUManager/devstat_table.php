
<div class="table-wrapper">
  <div id="devstat-table"></div>
</div>
<script>
  google.charts.load('current', {'packages':['table']});

  function drawTable(data) {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'ID');
    dataTable.addColumn('string', 'IP Address');
    dataTable.addColumn('string', 'Full Time Employee');
    dataTable.addColumn('string', 'ITS Version');

    var devs = data.device_status;
    var len = devs.length;
    for (var ii = 0; ii < len; ++ii)
    {
      var dev = devs[ii];
      dataTable.addRows([
        [dev.device_id,  dev.ipv4_address, dev.status, dev.its_framework_version],
      ]);
        
    }

    var table = new google.visualization.Table(document.getElementById('devstat-table'));

    var options = {
      showRowNumber: false, 
      width: "100%", 
      height: "100%"
    }

    table.draw(dataTable, options);
  }

  ajax(backendURLs.getDevStat, function(data) {
    console.log(data);
    console.log(backendURLs);
    drawTable(data);
  })
</script>