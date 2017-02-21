
var baseURL = "http://localhost:8000/";

backendURLs = Object.freeze({
  getDevStat: {
    url: baseURL + "infrastructure/rest/v1/cdm/getDeviceStatus",
    method: "get"
  },

  getCurrentDevStat: {
    url: baseURL + "infrastructure/rest/v1/cdm/getCurrentDeviceStatus",
    method: "get"
  },
  getTransacLog: {
    url: baseURL + "infrastructure/rest/v1/cdm/getTransactionLog",
    method: "get"
  },
  getITSFramVersions: {
    url: baseURL + "infrastructure/rest/v1/cdm/getITSFramVersions",
    method: "get"
  },
  getImgVersions: {
    url: baseURL + "infrastructure/rest/v1/cdm/getImagesVersions",
    method: "get"
  },
  upgradeDevice: {
    url: baseURL + "infrastructure/rest/v1/cdm/upgradeDevice",
    method: "post"
  },
  downgradeDevice: {
    url: baseURL + "infrastructure/rest/v1/cdm/downgradeDevice",
    method: "post"
  },
  upgradeITSFram: {
    url: baseURL + "infrastructure/rest/v1/cdm/upgradeITSFramework",
    method: "post"
  },
  syncConfig: {
    url: baseURL + "infrastructure/rest/v1/cdm/syncConfig",
    method: "post"
  },
  rebootDev: {
    url: baseURL + "infrastructure/rest/v1/cdm/rebootDevice",
    method: "post"
  }
});

var pages = {
  DEV_STATUS: {
    file: baseURL + "devstat_table.php",
    url: "dev_status",
    method: "get"
  },

  DASHBOARD: {
    file: baseURL + "dashboard.php",
    url: "dashboard",
    method: "get"
  },

  DETAIL: {
    file: baseURL + "detail.php",
    url: "detail",
    method: "get"
  }
}

function ajax(urlObj, data, suc_func, err_func, settings) {

  // shift arguments if data argument is omitted
  if ($.isFunction(data)) {
    settings = err_func;
    err_func = suc_func;
    suc_func = data;
    data = undefined;
  }

  if (!$.isFunction(suc_func)) {
    settings = err_func;
    err_func = suc_func;
    suc_func = undefined;
  }

  if (!$.isFunction(err_func)) {
    settings = err_func;
    err_func = undefined;
  }

  settings = settings || {};

  var settings_obj = {
    url: urlObj.url,
    method: urlObj.method,
    contentType: "application/json",
    data: data,
    success: suc_func,
    error: err_func,
    dataType: "json"
  };
  $.extend(settings_obj, settings);

  $.ajax(settings_obj);
}

function pageLoad(pageObj, selector, data) {
  if (typeof selector != "string") {
    data = selector;
    selector = ".main-container"; // default container
  }
  $.ajax({
    url: pageObj.file, 
    method: pageObj.method, 
    data: data, 
    success: function(html) {
      $(selector).html(html);
      pageObj.title = pageObj.title || "SMTB | Control Panel";
      window.history.pushState(html, pageObj.pageTitle, pageObj.url);
    }
  });
}