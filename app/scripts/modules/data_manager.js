define([
    'backbone',
    'communicator'
],
    function (Backbone, Communicator) {
        'use strict';

        return Backbone.Marionette.Module.extend({
            startWithParent: true,

            initialize: function (options, moduleName, app) {
                console.log("initialize a " + moduleName);
                //DB設定
                window.app = {};
                window.app.DB = openDatabase("appname", "", "AppName", 2 * 1024 * 1024);
                window.app.DB_VERSION = "1";
                window.app.BASE_URL = "http://www.watnow.jp/";
                window.app.TIMEOUT = 5000;
                window.app.SUGGEST_DELAY = 500;
                //DB Versionが違う場合
                if (window.app.DB.version != window.app.DB_VERSION) {
                    window.app.DB.changeVersion(window.app.DB.version, window.app.DB_VERSION, function (t) {
                    });
                }
            },

            onStart: function (options) {
                console.log("start Module");
            },

            onStop: function (options) {
                console.log("stop Module");
            },

            //初期データの準備など
            initializeData: function () {
            }

        });
    }
);
