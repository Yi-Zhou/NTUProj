
define(["util", "update"], function(util, update) {
  "use strict";

  var from_page;

  function getSelectedDevices() {
    var devices = [];
    var dev;
    $("input.device-selector:checked").each(function() {
      dev = JSON.parse($(this).val());
      devices.push(dev);
    });
    return devices;
  }

  function callback(resp) {
    util.displayMessage(resp.message);
  }

  var noDevMessage = "You haven't selected any devices.";
  var OneDeviceMessage = "You can only select one device at a time for this operation.";

  function upgradeDevice() {
    var devs = getSelectedDevices();
    console.log(from_page);
    if (devs.length === 0) {
      util.displayMessage(noDevMessage); 
      return;
    }
    util.pageLoad(util.pages.UPGRADE, function() {
      update.render(devs, "upgrade", from_page);
    });
  }

  function downgradeDevice() {
    var devs = getSelectedDevices();
    if (devs.length === 0) {
      util.displayMessage(noDevMessage); 
      return;
    }
    util.pageLoad(util.pages.DOWNGRADE, function() {
      update.render(devs, "downgrade", from_page);
    });

  }

  function syncConfig() {
    var devs = getSelectedDevices();
    if (devs.length === 0) {
      util.displayMessage(noDevMessage); 
      return;
    }
    var data = new util.backendURLs.syncConfig.data(devs, "13.0", "5-4.45");
    util.ajax(util.backendURLs.syncConfig, JSON.stringify(data), callback);
  }

  function rebootDevice() {
    var devs = getSelectedDevices();
    if (devs.length === 0) {
      util.displayMessage(noDevMessage); 
      return;
    }
    var data = new util.backendURLs.rebootDevice.data(devs, "13.0", "5-4.45");
    console.log(data);
    console.log(util.backendURLs.rebootDevice.url);
    util.ajax(util.backendURLs.rebootDevice, JSON.stringify(data), callback);
  }

  function changeItsFramework() {
    var devs = getSelectedDevices();
    if (devs.length === 0) {
      util.displayMessage(noDevMessage); 
      return;
    }
    util.pageLoad(util.pages.CHANGE_ITS, function() {
      update.render(devs, "change_its", from_page);
    });
  }

  return {
    unload: function() {
    },

    render: function(frm_pge) {
      from_page = frm_pge;
      $("button[name='upgrade-btn']").click(upgradeDevice);
      $("button[name='downgrade-btn']").click(downgradeDevice);
      $("button[name='sync-btn']").click(function() {
        (util.confirm(syncConfig, "Are you sure to synchronize the configuration file(s)?"))();
      });
      $("button[name='reboot-btn']").click(function() {
        (util.confirm(rebootDevice, "Are you sure to reboot the device(s)?"))();
      });
      $("button[name='its-btn']").click(changeItsFramework);
      $(".popup-cancel, .popup-close").click(function() {
        $(".overlay").hide();
      });
    }
  }
})
