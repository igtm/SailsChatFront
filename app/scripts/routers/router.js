define([
    'backbone',
    'communicator'
],
    function (Backbone, Communicator) {
        'use strict';

        return Backbone.Router.extend({
            /* Backbone routes hash */
            pages: {},
            initialize: function () {
                console.log("initialize a Router");
                this.pages = {};
                Communicator.command.setHandler('changePage', this.changePage, this);
                Communicator.command.setHandler('setBackHandler', this.setBackHandler, this);
                Communicator.command.setHandler('back', this.back, this);
                //ルート定義
                var routes = [];
                //ルートのbinding
                _.each(routes, function (route) {
                    this.route(route, "checkHash");
                }, this);
            },

            //独自にルートを定義する場合
            routes: {},

            /**
             * Hashの確認
             */
            checkHash: function (args) {
                var hash = decodeURI(location.hash);
                var end = hash.indexOf("?");
                var pageName;
                if (end != -1) {
                    pageName = hash.substr(1, end - 1);
                } else {
                    pageName = hash.substr(1);
                }
                var argObj = this.parseArgs(decodeURI(args));
                this.change(pageName, argObj);
            },

            /**
             * クエリーの分解
             * @param pageName
             * @param args
             * @returns {{}}
             */
            parseArgs: function (args) {
                var params = {};
                if (!_.isNull(args)) {
                    var argArray = args.split("&");
                    _.each(argArray, function (arg) {
                        var tmp = arg.split("=");
                        if (tmp.length == 2)
                            params[tmp[0]] = tmp[1];
                    });
                }
                return params;
            },

            //ページの生成と入れ替え
            change: function (page, args) {
                Communicator.command.execute('changeHeader', page);
                Communicator.command.execute('changeContent', page, args);
            },

            back: function () {
                history.back();
            },

            setBackHandler: function (handler) {
                if (_.isFunction(handler)) {
                    Communicator.command.setHandler('back', handler);
                } else {
                    Communicator.command.setHandler('back', this.back, this);
                }
            },

            //URLハッシュの作成
            changePage: function (page, args, option) {
                option = option || {};
                var defaults = {
                    trigger: true,
                    replace: false
                };
                var url = "#" + page;
                if (args) {
                    url += "?";
                    if (typeof args == 'object') {
                        url += _.map(args,function (arg, index) {
                            return index + "=" + arg;
                        }).join('&');
                    } else {
                        url += args;
                    }
                }

                this.navigate(encodeURI(url), _.extend(defaults, option));
            }

        });
    });
