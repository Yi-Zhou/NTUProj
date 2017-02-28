define(["util", "gmap"], function(util) {
  "use strict";

  function render(dev) {
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
    execute: function(data) {

      $("#detail-attr-container").append(`
        <h1 class="detail-title"></h1>
        <ul class="detail-attr-list">
          <li><span class="attr" name="ipv4"><strong>IPv4:</strong></span> <span class="val" name="ipv4_val"><span></li>
          <li><span class="attr" name="its_version"><strong>ITS Version:</strong></span> <span class="val" name="its_version_val"></span></li>
          <li><span class="attr" name="image"><strong>Image:</strong></span> <span class="val" name="image_version_val"></span></li>
          <li><span class="attr" name="python_version"><strong>Python Version:</strong></span> <span class="val" name="python_version_val"></span></li>
        </ul>
      `);

      var dev = util.lazyGetDevStat(data.dev_id);
      if (dev) {
        render(dev);
      }
      else {
        util.ajax(util.backendUrls.getCurrentDevStat, function(resp) {
          dev = resp.device_status[0];
          render(dev);
        })
      }
    }
  }
});
