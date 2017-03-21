requirejs.config({
  baseUrl: "js",
  waitSeconds: 30,
  paths: {
    util: "util",
    jquery: "lib/jquery-3.1.1.min",
    gloader: "https://www.gstatic.com/charts/loader",
    gmap: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAbuDiYnmJ9KOZHdmqN00DrekE-4UpVexg"
  }
});

(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        var ret = pushState.apply(history, arguments);
        $(window).trigger("pushstate"); // trigger pushstate event
        return ret;
    }
})(window.history);

