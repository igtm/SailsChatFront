/**
 * Created by Tomokatsu on 14/12/01.
 */
define([
    'backbone',
    'communicator'
],
    function(Backbone, Communicator){
        return Backbone.Marionette.Module.extend({
            startWithParent: false,

            initialize: function (options, moduleName, app) {
                console.log("initialize a " + moduleName);
            },

            onStart: function (options) {
                console.log("start Module: manualConnection_manager");
                this.trigger('DB:ready');
            },

            onStop: function (options) {
                console.log("stop Module: manualConnection_manager");
            },

            'ajax': function (method,path,title,params){
                var method = method || 'get';
                var path = path || '';
                var title = title || '通信中';
                var params = params || '';

                Communicator.command.execute('showDialog','progress',{
                    title: title
                });
                var url = window.app.BASE_URL;
                switch(method){
                    case 'get':
                        url += path;
                        break;
                    case 'post':
                        break;
                    case 'put':
                        break;
                    case 'delete':
                        break;
                }
                $.ajax({
                    method:method,
                    dataType: 'json',
                    url: url,
                    data: params
                })
                .done(function( data, textStatus, jqXHR ) {
                })
                .fail(function( jqXHR, textStatus, errorThrown ){
                })
                .always(function( data, textStatus, errorThrown ){
                });
            }
        });
    }
);