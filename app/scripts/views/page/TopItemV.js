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
            Communicator.command.setHandler("Top:notice",this.notice,this);
            this.notice1Count = 0;
            this.notice2Count = 0;
            this.notice3Count = 0;
            this.bindUIElements();
        },
		
    	template: TopitemvTmpl,
        

    	/* ui selector cache */
    	ui: {
            'notice1':'#notice1',
            'notice2':'#notice2',
            'notice3':'#notice3'
        },

        className: "page",
		/* Ui events hash */
		events: {
            'tap .enterTheRoom':'onTap'
        },
        onTap: function(e){
            console.log('onTap');
            var UserModel = Communicator.reqres.request("DM:getData",'user'); // 自分のモデルをゲット
            var room_id = $(e.currentTarget).attr('data-action');
            var id = UserModel.get('id');
            var url = window.app.BASE_URL + 'room/'+room_id+'/users/'+id; // blueprintsで自動でadd to/remove fromされる(document参照)
            io.socket.post(url);
            var query = {room_id: room_id};
            UserModel.set(query);
            this.noticeRemove(room_id);
            Communicator.command.execute('changePage','room',query);
        },

        //view操作
        notice: function(room_id){
            switch(room_id){
                case 1:
                    if(this.notice1Count == 0)this.ui.notice1.show();
                    this.ui.notice1.text(++this.notice1Count);
                        break;
                case 2:
                    if(this.notice2Count == 0)this.ui.notice2.show();
                    this.ui.notice2.text(++this.notice2Count);
                    break;
                case 3:
                    if(this.notice3Count == 0)this.ui.notice3.show();
                    this.ui.notice3.text(++this.notice3Count);
                    break;
            }
        },
        noticeRemove: function(room_id){
            console.log('noticeRemove');
            console.log(room_id);
            switch(room_id){
                case '1':
                    console.log(this.notice1Count);
                    if(this.notice1Count != 0){
                        this.ui.notice1.hide();
                        this.notice1Count = 0;
                        this.ui.notice1.text('');
                    }
                    break;
                case '2':
                    if(this.notice2Count != 0){
                        this.ui.notice2.hide();
                        this.notice2Count = 0;
                        this.ui.notice2.text('');
                    }
                    break;
                case '3':
                    if(this.notice3Count != 0){
                        this.ui.notice3.hide();
                        this.notice3Count = 0;
                        this.ui.notice3.text('');
                    }
                    break;
            }
        },


        /* on render callback */
		onRender: function() {}
	});

});
