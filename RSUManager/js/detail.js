define(["util", "gmap"], function(util) {
  "use strict";

  function render_data(dev) {
    console.log(dev);
    $(".val[name=ipv4_val]>").text(dev.ipv4_address);
    $(".val[name=its_version_val]").text(dev.its_framework_version);
    $(".val[name=image_version_val]").text(dev.image_version);
    $(".val[name=python_version_val]").text("3.4.1");
    $(".detail-title").text(dev.device_id);

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

  return {
    render: function(data) {

      var dev = util.lazyGetDevStat(data.dev_id);
      if (dev) {
        console.log("here");
        render_data(dev);
      }
      else {
        util.ajax(util.backendUrls.getCurrentDevStat, function(resp) {
          dev = resp.device_status[0];
          console.log("there");
          render_data(dev);
        })
      }
    }
  }
});
