define(["jquery"], function() {
  "use strict";

  var baseURL = "http://localhost:8000/";
  var serverURL = "http://172.21.26.57:8080/";
  serverURL = baseURL;
  var storage = {
    keys: {
      DEV_STAT: "devstat",
      EVENT_LIST: "eventlist"
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
    serverURL: serverURL,

    backendURLs: Object.freeze({
      getDevStat: {
        url: serverURL + "infrastructure/rest/v1/cdm/getDeviceStatus",
        method: "get"
      },

      getCurrentDevStat: {
        url: serverURL + "infrastructure/rest/v1/cdm/getCurrentDeviceStatus",
        method: "get"
      },
      getEventList: {
        url: serverURL + "infrastructure/rest/v1/cdm/getTransactionLog",
        method: "get"
      },
      getITSFramVersions: {
        url: serverURL + "infrastructure/rest/v1/cdm/getITSFramVersions",
        method: "get"
      },
      getImgVersions: {
        url: serverURL + "infrastructure/rest/v1/cdm/getImagesVersions",
        method: "get"
      },
      upgradeDevice: {
        url: serverURL + "infrastructure/rest/v1/cdm/upgradeDevice",
        method: "post",
        data: function(devs, its_version, image_version) {
          this.devices = devs,
          this.its_framework_version = its_version,
          this.image_version = image_version
        }
      },
      downgradeDevice: {
        url: serverURL + "infrastructure/rest/v1/cdm/downgradeDevice",
        method: "post",
        data: function(devs, its_version, image_version) {
          this.devices = devs,
          this.its_framework_version = its_version,
          this.image_version = image_version
        }
      },
      changeItsFramework: {
        url: serverURL + "infrastructure/rest/v1/cdm/upgradeITSFramework",
        method: "post",
        data: function(devs, its_version) {
          this.devices = devs,
          this.its_framework_version = its_version
        }
      },
      syncConfig: {
        url: serverURL + "infrastructure/rest/v1/cdm/syncConfig",
        method: "post",
        data: function(devs) {
          this.devices = devs
        }
      },
      rebootDevice: {
        url: serverURL + "infrastructure/rest/v1/cdm/rebootDevice",
        method: "post",
        data: function(devs) {
          this.devices = devs
        }
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
      },

      OPERATIONS: {
        file: baseURL + "operations.html",
        url: "ops",
        method: "get"
      },

      EVENTS: {
        file: baseURL + "events.html",
        url: "events",
        method: "get"
      },

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
      return null;      
    },

    setDevStat: function(devstat) {
      if ($.isPlainObject(devstat) || $.isArray(devstat))
        storage.setJson(storage.keys.DEV_STAT, devstat);
      else
        storage.set(storage.keys.DEV_STAT, devstat);
    },

    setEventList: function(eventlist) {
      if ($.isPlainObject(eventlist) || $.isArray(eventlist)) 
        storage.setJson(storage.keys.EVENT_LIST, eventlist);
      else
        storage.set(storage.keys.EVENT_LIST, eventlist);
    },

    lazyGetEventList: function() {
      var eventlist = storage.getJson(storage.keys.EVENT_LIST);
      return eventlist;
    },

    unloadCallback: function(callback) {
      $(".tab-item").not("active").click(callback);
      $(".detail-link").click(callback);
    },

    confirm: function(call, msg) {
      if (msg === undefined) msg = "Are you sure to continue?";
      var ans = confirm(msg);
      console.log(ans);
      if (ans) return call;
      else return function() {};
    }

  }
});