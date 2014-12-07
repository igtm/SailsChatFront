/**
 * Created by Tomokatsu on 14/12/01.
 */
define([
    'backbone',
    'communicator',
    'pageManager',
    'io'
],
    function(Backbone, Communicator, pageManager){
        return Backbone.Marionette.Module.extend({
            startWithParent: false,

            initialize: function (options, moduleName, app) {
                console.log("initialize a " + moduleName);
                io.socket.on('user',this.onUser);
                io.socket.on('room',this.onRoom);
            },
            onUser: function(msg){
                var hash = pageManager.getCurrentHash();
                console.log(hash);
                switch (msg.verb) {
                    case 'created':
                        Communicator.command.execute('showToast',msg.data.name+'さんがログインされました');
                        break;
                }
            },
            onRoom: function(msg){
                var hash = pageManager.getCurrentHash();
                console.log(hash);
                switch(msg.verb){
                    case 'addedTo':
                        console.log(msg);
                        console.log(msg.id);
                        console.log(msg.addedId);
                        console.log(msg.attribute);
                        Communicator.command.execute('showToast','ID: '+msg.addedId+'がroom'+msg.id+'に入室されました。');
                        break;
                    case 'messaged':
                        console.log(msg);
                        console.log(msg.id);
                        console.log(msg.data);
                        Communicator.command.execute("Room"+msg.id+":createMsg",msg.data);
                        if(hash == 'top'){
                            Communicator.command.execute("Top:notice",msg.id);
                        }
                        //Communicator.command.execute('showToast',msg.data.name+'さんがroom'+msg.data.enterTheRoom+'に入室されました。');
                        break;

                }
            }

            /*
            onStart: function (options) {
                console.log("start Module: Socket_manager");
            },

            onStop: function (options) {
                console.log("stop Module: Socket_manager");
            }*/
        });
    }
);