define(["util"], function(util) {
  "use strict";

  function render_data(devs) {
    var dev = devs[0];
    $(".op-title").text(dev.device_id);
    $(".val[name=its_version_val]").text(dev.its_framework_version);
    $(".val[name=image_version_val]").text(dev.image_version);
    util.ajax(util.backendURLs.getITSFramVersions, {device_type: dev.device_type}, function(resp) {
      var versions = resp.its_framework_versions;
      var len = versions.length;
      for (var ii = 0; ii < len; ++ii) {
        var ver = versions[ii].version;
        $("#its_selector").append("<option value="+ver+">"+ver+"</option>");
      }
    });
    util.ajax(util.backendURLs.getImgVersions, {device_type: dev.device_type}, function(resp) {
      var versions = resp.image_versions;
      var len = versions.length;
      for (var ii = 0; ii < len; ++ii) {
        var ver = versions[ii].version;
        $("#image_selector").append("<option value="+ver+">"+ver+"</option>");
      }
    })
  }

  return {
    render: function(devs, type) {
      render_data(devs);
      $("button[name=cancel-btn]").click(function() {
        util.pageLoad(util.pages.DETAIL, {dev_id: devs[0].device_id}, function() {
          require("detail").render({dev_id: devs[0].device_id});
        });
      });
      var btn_txt;
      if (type === "upgrade") {
        btn_txt = "Upgrade";
      }
      else if (type === "downgrade") {
        btn_txt = "Downgrade";
      }
      else if (type === "change_its") {
        btn_txt = "Update";
        $("li[name=image-option]").remove();
      }
      $("button[name=update-btn]").text(btn_txt).click(function() {
        var its_version = $("#its_selector > option:selected").val();
        var img_version = $("#image_selector > option:selected").val();
        if (type === "upgrade") {
          util.ajax(util.backendURLs.upgradeDevice, JSON.stringify(new util.backendURLs.upgradeDevice.data(devs, its_version, img_version)), function(resp) {
            util.displayMessage(resp.message);
          });
        }
        else if (type === "downgrade") {
          util.ajax(util.backendURLs.downgradeDevice, JSON.stringify(new util.backendURLs.downgradeDevice.data(devs, its_version, img_version)), function(resp) {
            util.displayMessage(resp.message);
          });
        }
        else if (type === "change_its") {
          util.ajax(util.backendURLs.changeItsFramework, JSON.stringify(new util.backendURLs.changeItsFramework.data(devs, its_version, img_version)), function(resp) {
            util.displayMessage(resp.message);
          });
        }
      });
      $(".popup-cancel, .popup-close").click(function() {
        $("button[name=cancel-btn]").click();
      });
    }
  }
})