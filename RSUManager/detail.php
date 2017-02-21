<div class="detail-container">
  <div class="detail-wrapper">
    <div class="detail-attr-wrapper">
        <h1 class="detail-title"><?php echo $_GET["device_id"] ?></h1>
        <ul class="detail-attr-list">
          <li><span class="attr"><strong>IPv4:</strong></span> <span class="val"><?php echo $_GET["ipv4_address"] ?><span></li>
          <li><span class="attr"><strong>ITS Version:</strong></span> <span class="val"><?php echo $_GET["its_framework_version"] ?></span></li>
          <li><span class="attr"><strong>Image:</strong></span> <span class="val"><?php echo $_GET["image_version"] ?></span></li>
          <li><span class="attr"><strong>Python Version:</strong></span> <span class="val"><?php if (isset($_GET["python_version"])) echo $_GET["python_version"]; else echo "3.4.1" ?></span></li>
        </ul>
    </div>
    <div id="location-map"></div>
    <section class="ops-container">
      <div class="ops-wrapper">
        <button class="op-btn upgrade">Upgrade</button>
        <button class="op-btn downgrade">Downgrade</button>
        <button class="op-btn reboot" onclick="reboot()">Reboot</button>
        <button class="op-btn sync" onclick="sync()">Sync</button>
        <form action="" class="upload-form">
          <input type="file" class="rsu-image" accept=".pdf" multiple/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  </div>
</div>
<script>
  var latLng = {lat: 1.348857, lng: 103.681909};
  var map = new google.maps.Map(document.getElementById('location-map'),{
    center: latLng,
    zoom: 16
  });
  var marker = new google.maps.Marker({position: latLng, map: map, title: $(".detail-title").text()});
</script>