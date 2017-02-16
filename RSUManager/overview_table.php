
<div class="table-wrapper">
  <table class="rsu-table">
    <thead>
      <tr>
        <th><a href="#">ID</a></th>
        <th><a href="#">Attribute 1</a></th>
        <th><a href="#">Attribute 2</a></th>
        <th><a href="#">Attribute 3</a></th>
        <th><a href="#">Availability</a></th>
      </tr>
    </thead>
    <tbody>
    <?php
    for ($ii = 0; $ii < 64; ++$ii) {
      echo "
        <tr>
          <td><a href='#' class='detail-link'>RSU$ii</a></td>
          <td>RSU$ii.Value1</td>
          <td>RSU$ii.Value2</td>
          <td>RSU$ii.Value3</td>
          <td>randomStatus()</td>
        </tr>";
    }
    for ($ii = 0; $ii < 64; ++$ii) {
      echo "
        <tr>
          <td><a href='#' class='detail-link'>OBU$ii</a></td>
          <td>OBU$ii.Value1</td>
          <td>OBU$ii.Value2</td>
          <td>OBU$ii.Value3</td>
          <td>`+randomStatus()+`</td>
        </tr>";
    }
    ?>
    </tbody>
  </table>
</div>