define([
	'backbone',
	'hbs!tmpl/page/TopItemV_tmpl',
    'communicator',
    'io'
],
function( Backbone, TopitemvTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Topitemv ItemView");
            io.socket.on('user',this.onModelChangeViaSocket);
		},
		
    	template: TopitemvTmpl,
        

    	/* ui selector cache */
    	ui: {},
        className: "page",
		/* Ui events hash */
		events: {
            'tap .enterTheRoom':'onTap'
        },
        onTap: function(e){
            var room_id = $(e.currentTarget).attr('data-action');
            var url = window.app.BASE_URL + 'room';
            var UserModel = Communicator.reqres.request("DM:getData",'user');
            var id = UserModel.get('id');
            console.log('onTap');
            console.log(url);
            console.log(UserModel);
            console.log(id);
            console.log(room_id);
            var data = {id: id, room_id: room_id};
            var cb = function(data){UserModel.set(data);};
            io.socket.get(url, data, cb);
            var query = {room_id: room_id};
            Communicator.command.execute('changePage','room',query);
        },
        onModelChangeViaSocket: function(msg){
            switch (msg.verb) {
                case 'created':
                    Communicator.command.execute('showToast',msg.data.name+'さんがログインされました');
                    break;
            }
        },

		/* on render callback */
		onRender: function() {}
	});

});
