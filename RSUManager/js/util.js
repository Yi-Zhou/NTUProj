define(["jquery"], function() {
  "use strict";

  var baseURL = "http://localhost:8000/";
  var storage = {
    keys: {
      DEV_STAT: "devstat",
    },
    set: function(key, val) {
      localStorage.setItem(key, val);
      return this;
    },
    setJson: function(key, json) {
      localStorage.setItem(key, JSON.stringify(json));
    },
    get: function(key) {
      return localStorage.getItem(key);
    },
    delete: function(key) {
      localStorage.removeItem(key);
    },
    getJson: function(key) {
      return $.parseJSON(localStorage.getItem(key));
    },
    isSet: function(key) {
      if (localStorage.getItem(key))
        return true;
      return false;
    },
    init: function() {
      for (var key_name in this.keys) {
        localStorage.removeItem(this.keys[key_name]);
      }
    }
  };

  return {
    baseURL: baseURL,

    backendURLs: Object.freeze({
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
    }),

    pages: Object.freeze({
      DEV_STATUS: {
        file: baseURL + "devstat_table.html",
        url: "dev_status",
        method: "get"
      },

      DASHBOARD: {
        file: baseURL + "dashboard.html",
        url: "dashboard",
        method: "get"
      },

      DETAIL: {
        file: baseURL + "detail.html",
        url: "detail",
        method: "get"
      }
    }),

    ajax: function (urlObj, data, suc_func, err_func, settings) {

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
    },

    pageLoad: function(pageObj, selector, data, callback) {

      var arg_num = 4;

      if (typeof selector !== "string") {
        arg_num--;
        callback = data;
        data = selector;
        selector = ".main-container"; // default container
      }

      if ($.isFunction(data)) {
        arg_num--;
        callback = data;
        data = undefined;
      }

      var args = Array.prototype.slice.call(arguments, arg_num);
      $.ajax({
        url: pageObj.file, 
        method: pageObj.method, 
        data: data, 
        success: function(html) {
          $(selector).html(html);
          pageObj.title = pageObj.title || "SMTB | Control Panel";
          if ($.isFunction(callback)) 
            callback.apply(this, args);
          window.history.pushState(html, pageObj.pageTitle, pageObj.url);
        }
      });
    },

    storage: storage,

    lazyGetDevStat: function(dev_id) {
      var devs = storage.getJson(storage.keys.DEV_STAT);
      if ($.isPlainObject(devs) || $.isArray(devs)) {
        if (dev_id) {
          for (var key in devs) {
            var dev = devs[key];
            if (dev.device_id === dev_id) 
              return dev;
          }
          return null;
        }
        return devs;
      }
      console.log(typeof devs);
      console.log(devs);
      return null;      
    },

    setDevStat: function(devstat) {
      if ($.isPlainObject(devstat) || $.isArray(devstat))
        storage.setJson(storage.keys.DEV_STAT, devstat);
      else
        storage.set(storage.keys.DEV_STAT, devstat);
    }
  }
});