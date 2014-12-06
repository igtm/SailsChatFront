define([
    'backbone',
    'communicator',
    'models/UserModel'
],
    function (Backbone, Communicator, UserModel) {
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
                app.BASE_URL = "http://localhost:1337/";
                app.TIMEOUT = 5000;
                app.SUGGEST_DELAY = 500;
                //DB Versionが違う場合
                if (app.DB.version != app.DB_VERSION) {
                    app.DB.changeVersion(app.DB.version, app.DB_VERSION, function (t) {
                    });
                }
                window.app = app;
                this.initializeData();

                Communicator.reqres.setHandler("DM:getData",this.getData,this);
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
                this.UserModel = new UserModel();
            },
            getData: function(data){
                var result;
                switch(data){
                    case 'user':
                        result = this.UserModel;
                        break;
                }
                return result;
            }

        });
    }
);
