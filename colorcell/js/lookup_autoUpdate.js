jQuery.noConflict();

(function($, PLUGIN_ID) {
  "use strict";

  // ルックアップするアプリのID
  //レコード一覧画面のURLに書いてある数字を入力
  //ex.https://u63e0.cybozu.com/k/46/ → AppId = 46
  //var updateAppId = kintone.app.getLookupTargetAppId('getAppID');

  function createPutRecords(records) {
    var putRecords = [];
    for (var i = 0; i < records.length ; i++) {
      var record = records[i];
      putRecords[i] = {
        id: record['$id'].value,
        record: {
          lookup: {
            value: record.lookup.value
          }
        }
      };
      //console.log(putRecords[i]);
    }
    return putRecords;
  }

  function updateLookup(appId, records) {
    kintone.api(
      kintone.api.url('/k/v1/records', true),
      'PUT', {
        app: appId,
        records: records
      },
      function(resp) {
        //alert('ルックアップの更新が完了しました!');
      }
    );
  }

  // 保存実行時イベント
  kintone.events.on(['app.record.index.show', 'app.record.edit.submit', 'app.record.index.edit.submit'], function(event) {
    // レコードの一括取得(100件まで)
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    console.log(config);
    var updateAppId = config["app_number"];
    //console.log(event);
    if (event.type === 'app.record.index.show') {
      for (var i = 0; i < event.records.length; i++) {
        kintone.api(
          kintone.api.url('/k/v1/records', true),
          'GET', {
            app: updateAppId,
            query: 'lookup = ' + event.records[i]["レコード番号"].value
          },
          function(resp) {
            var records = resp.records;
            //console.log(records);
            // ルックアップの更新
            updateLookup(updateAppId, createPutRecords(records));
          }
        );
      }
    } else {
      kintone.api(
        kintone.api.url('/k/v1/records', true),
        'GET', {
          app: updateAppId,
          query: 'lookup = ' + event.record['レコード番号'].value
        },
        function(resp) {
          var records = resp.records;
          //console.log(resp);
          // ルックアップの更新
          updateLookup(updateAppId, createPutRecords(records));
        });
    }
  });
})(jQuery, kintone.$PLUGIN_ID);
