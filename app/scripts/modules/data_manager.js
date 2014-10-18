define([
    'backbone',
    'communicator'
],
    function (Backbone, Communicator) {
        'use strict';

        return Backbone.Marionette.Module.extend({
            startWithParent: false,

            initialize: function (options, moduleName, app) {
                console.log("initialize a " + moduleName);
                //DB設定
                var app = {};
                app = {};
                app.DB = openDatabase("appname", "", "AppName", 2 * 1024 * 1024);
                app.DB_VERSION = "1";
                app.BASE_URL = "http://www.watnow.jp/";
                app.TIMEOUT = 5000;
                app.SUGGEST_DELAY = 500;
                //DB Versionが違う場合
                if (app.DB.version != app.DB_VERSION) {
                    app.DB.changeVersion(app.DB.version, app.DB_VERSION, function (t) {
                    });
                }
                window.app = app;
            },

            onStart: function (options) {
                console.log("start Module");
                this.trigger('DB:ready');
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
