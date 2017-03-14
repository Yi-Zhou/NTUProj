define(["util", "gloader"], function(util) {
  "use strict";

  function drawTable(eventlist) {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Event Type');
    dataTable.addColumn('string', 'Operation');
    dataTable.addColumn('string', 'Status');
    dataTable.addColumn('string', 'Log');
    dataTable.addColumn('string', 'Timestamp');

    var len = eventlist.length;
      for (var ii = 0; ii < len; ++ii)
      {
        var ev = eventlist[ii];

        dataTable.addRows([
          [ev.event_type, ev.operation, ev.status, ev.log, ev.timestamp]
        ]);
      }
    var table = new google.visualization.Table(document.getElementById('event-table'));

    var options = {
      allowHtml: true,
      showRowNumber: false, 
      width: "100%", 
      height: "100%"
    }

    table.draw(dataTable, options);
  }

  function callback(resp) {
    console.log(resp);
    var eventlist = resp.log;
    util.setEventList(eventlist);
    drawTable(eventlist);
  }

  function refresh() {
    util.ajax(util.backendURLs.getEventList, callback);
  }

  function unload(e) {
    $("#refresh-btn").off("click", refresh);
  }


  return {
    render: function() {
      google.charts.load('current', {'packages':['table']});


      var eventlist = util.lazyGetEventList();
      console.log(eventlist);

      if (!eventlist)
        util.ajax(util.backendURLs.getEventList, callback);
      else 
        drawTable(eventlist);

      $("#refresh-btn").click(refresh);

      util.unloadCallback(unload);
    }
  }

  return {
    render: function() {

    }
  }
})
