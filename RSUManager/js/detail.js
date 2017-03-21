define(["util", "dev_control", "gmap"], function(util, dev_control) {
  "use strict";

  var device_id;
  var device_type;

  function render_data(dev) {
    $(".val[name=device_type_val]").text(dev.device_type);
    $(".val[name=device_mac_val]").text(dev.device_mac);
    $(".val[name=ipv4_val]").text(dev.ipv4_address);
    $(".val[name=ipv6_val]").text(dev.ipv6_address);
    $(".val[name=active_image_val]").text(dev.active_image);
    $(".val[name=image_version_val]").text(dev.image_version);
    $(".val[name=its_version_val]").text(dev.its_framework_version);
    $(".val[name=status_val]").text(dev.status);
    $(".detail-title").text(dev.device_id);
    $("input.device-selector:checked").val(JSON.stringify(dev));

    if (dev.status === "online") {
      $(".val[name=status_val]").css("color", "green");
    }
    else {
      $(".val[name=status_val]").css("color", "red");
    }

    if (dev.device_type === "RSU")
    {
      var latLng = {lat: dev.latitude, lng: dev.longitude};
      var map = new google.maps.Map(document.getElementById('location-map'),{
        center: latLng,
        zoom: 16
      });
      var marker = new google.maps.Marker({position: latLng, map: map, title: $(".detail-title").text()});
    }
  }

  function refresh() {
    console.log("refreshing details");
    util.ajax(util.backendURLs.getCurrentDevStat, {device_id: device_id, device_type: device_type}, function(resp) {
      console.log(resp);
    });
  }

  return {
    unload: function() {
      console.log("detail unload");
      $("#refresh-btn").off("click", refresh);
    },

    render: function(data) {
      device_id = data.device_id;
      device_type = data.device_type;
      console.log(device_type);
      console.log(device_id);

      $(window).on("unload", function() {
        console.log("unloading");
        this.unload();
      });

      var dev = util.lazyGetDevStat(device_id);
      if (dev) {
        render_data(dev);
      }
      else {
        util.ajax(util.backendURLs.getCurrentDevStat, {device_id: device_id, device_type: device_type}, function(resp) {
          dev = resp.device_status[0];
          render_data(dev);
        });
      }
      util.pageLoad(util.pages.DEV_CONTROL, ".ops-nav", function() {
        dev_control.render("detail");
      });
      util.unloadCallback(this.unload);
      $("#refresh-btn").click(refresh);
    }
  }
});
