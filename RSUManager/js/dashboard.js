define(["util", "gloader"], function(util) {
  "use strict"

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
      pieSliceText: 'percentage',
      colors: ["#0085ff", "#4ca9ff", "#ff4d00", "#ff7400"],
      backgroundColor: {fill: "#fefefe"}
    };

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

    var table = new google.visualization.Table(document.getElementById('overview-table'));

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
      if (dev.status === "online" && dev.device_type === "RSU") 
        values.rsu_online_num++;
      else if (dev.device_type === "RSU") 
        values.rsu_offline_num++;
      else if (util.isOnline(dev) && dev.device_type === "OBU") 
        values.obu_online_num++;
      else if (dev.device_type === "OBU") 
        values.obu_offline_num++;
    }

    google.charts.setOnLoadCallback(function() {
      drawChart(values);
      drawTable(values);
    });
  }

  function onWindowResize() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
  }

  function onWindowResizeEnd(ev) {
    drawCharts(ev.data.devstat);
  }

  function callback (resp) {
    var devstat = resp.device_status;
    util.setDevStat(devstat);

    dataRequiredOps(devstat);
  }

  function refresh() {
    util.ajax(util.backendURLs.getCurrentDevStat, callback);
  }

  function unload() {
    // when click away
    $(window).off("resize", onWindowResize);
    $(window).off("resizeEnd", onWindowResizeEnd);
    $("#refresh-btn").off("click", refresh);
    $(".resizer").off("mouseup", onWindowResizeEnd);
  }

  function dataRequiredOps(devstat) {
    $(window).on('resizeEnd', {devstat: devstat}, onWindowResizeEnd);
    $(".resizer").on("mouseup", {devstat: devstat}, onWindowResizeEnd);
    drawCharts(devstat);
  }

  return {
    render: function() {

      var devstat = util.lazyGetDevStat();
      console.log(devstat);

      if (!devstat)
      {
        console.log("load failed");
        util.ajax(util.backendURLs.getDevStat, callback);
        //redraw graph when window resize is completed  
      }
      else 
      {
        dataRequiredOps(devstat);
      }
      $(window).resize(onWindowResize);

      $("#refresh-btn").click(refresh);
      util.unloadCallback(unload);

    }
  }
});
