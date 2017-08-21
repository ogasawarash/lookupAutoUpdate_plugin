jQuery.noConflict();

(function($, PLUGIN_ID) {
  "use strict";

  $(document).ready(function() {
    var getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
    console.log(getConfig);
    if (getConfig) {
      $("#app_number").val(getConfig["app_number"]);
    }

    $("#setting_submit").on("click", function() {
      var setConfig = {};
      var app_num = $("#app_number").val();
      setConfig["app_number"] = app_num;
      console.log(setConfig);
      kintone.plugin.app.setConfig(setConfig);
    });
  });
})(jQuery, kintone.$PLUGIN_ID);
