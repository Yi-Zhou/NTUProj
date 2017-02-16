<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SMTB | Control Panel</title>

    <link href="css/glyphicon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="js/lib/jquery-3.1.1.min.js"></script>
    <script src="js/script.js"></script>

  </head>
  <body> 
  <div class="main-site">
    <header id="main-header">
      <?php 
      include_once("header.php");
      ?>
    </header>
    <section id="main-sidebar" class="sidebar">
      <?php
      include_once("sidebar.php");
      ?>
    </section>
    <div class="resizer" draggable="true">
    </div>
    <nav class="nav-tabs">
      <?php
      include_once("nav_tabs.php");
      ?>
    </nav>
    <section class="table-container">
      <?php
      include_once("overview_table.php");
      ?>
    </section>
    <section class="main-container">
      <section class="detail-container">
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
      </section>
    </section>
  </div>
  <noscript>
    This page requires JavaScript to run.
    <style>
      .main-site {
        display: none;
      }
    </style>
  </noscript>
  </body>
</html>