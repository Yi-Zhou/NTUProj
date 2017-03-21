define(["util", "detail", "gloader", "gmap"], function(util, detail) {
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

  function makeMarker(dev, map, infowindow) {
    var latLng = {lat: dev.latitude, lng: dev.longitude}
    var marker = new google.maps.Marker({position: latLng, map: map, title: dev.device_id});

    marker.addListener('mouseover', function() {
      infowindow.open(map, this);
    });

    // assuming you also want to hide the infowindow when user mouses-out
    marker.addListener('mouseout', function() {
      infowindow.close();
    });
    marker.addListener('click', function() {
      infowindow.open(map, this);
    });
    marker.addListener('dblclick', function() {
      console.log("I am triggered!");
      util.pageLoad(util.pages.DETAIL, {device_id: dev.device_id, device_type: dev.device_type}, function() {
        detail.render({device_id: dev.device_id, device_type: dev.device_type});
      });
    });
  }

  function drawMap(devs) {

    var latLng = {lat: 1.348857, lng: 103.681909};
    var map = new google.maps.Map(document.getElementById('overview-map'),{
      center: latLng,
      zoom: 14
    });

    var len = devs.length;
    for (var ii = 0; ii < len; ++ii)
    {
      var dev = devs[ii];
      if (dev.device_type === "RSU")
      {
        var infowindow = new google.maps.InfoWindow({
          content: dev.device_id
        });
        makeMarker(dev, map, infowindow);
      }
    }
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
      if (util.isOnline(dev) && dev.device_type === "RSU") 
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
    drawMap(devs);
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
