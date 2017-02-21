<?php
  $baseURL = "http://localhost:8000/";
?>
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
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
 <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbuDiYnmJ9KOZHdmqN00DrekE-4UpVexg" ></script>

    <script src="js/config.js"></script>
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
    <section class="main-container">
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