define([
	'backbone',
	'views/item/RoomItemV',
	'hbs!tmpl/page/RoomCompV_tmpl',
    'communicator',
    'collections/ChatCollection',
    'models/ChatModel',
    'io'
],
function( Backbone, Roomitemv, RoomcompvTmpl, Communicator, Chats, Chat  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function(obj) {
			console.log("initialize a Roomcompv CompositeView");
            this.room_id = Number(obj.room_id);
            Communicator.command.setHandler("Room"+this.room_id+":createMsg",this.createMsg,this);
            this.collection = new Chats();
        },
		
    	itemView: Roomitemv,
    	
    	template: RoomcompvTmpl,
        className: "page",

    	/* ui selector cache */
    	ui: {
            text: '#text'
        },

    	/* where are we appending the items views */
    	itemViewContainer: ".lists",

		/* Ui events hash */
		events: {
            'tap .Room_button': 'submitMsg',
            'keypress #text': 'onkeypress'
        },

        onkeypress: function(e){
            if(e.keyCode !== 13)return;
            this.submitMsg();
        },
        // メッセージ送信!!
        submitMsg: function(){
            var msg = this.ui.text.val();
            this.ui.text.val('');
            var url = window.app.BASE_URL + 'chat/public';
            var UserModel = Communicator.reqres.request("DM:getData",'user'); // 自分のモデルをゲット
            var id = UserModel.get('id');
            var name = UserModel.get('name');
            io.socket.post(url, {from: id, room_id: this.room_id,msg: msg});
            var modelData = {
                public: true,
                msg: msg,
                room_id: this.room_id,
                senderId: id,
                senderName: name
            };
            console.log(modelData);
            this.collection.add(modelData);
        },
        // onSomeonePublishesMessage
        createMsg: function(data){
            var modelData = {
                public: true,
                msg: data.msg,
                room_id: this.room_id,
                senderId: data.from.id,
                senderName: data.from.name
            };
            console.log(modelData);
            this.collection.add(modelData);
        },

		/* on render callback */
		onRender: function() {}
	});

});
