define([
	'backbone',
	'views/item/RoomItemV',
	'hbs!tmpl/page/RoomCompV_tmpl',
    'communicator',
    'io'
],
function( Backbone, Roomitemv, RoomcompvTmpl, Communicator  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Roomcompv CompositeView");
            io.socket.on('room',this.onModelChangeViaSocket);
		},
		
    	itemView: Roomitemv,
    	
    	template: RoomcompvTmpl,
        className: "page",

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: ".lists",

		/* Ui events hash */
		events: {},

        onModelChangeViaSocket: function(msg){
          switch(msg.verb){
              case 'created':
                  Communicator.command.execute('showToast',msg.data.name+'さんがroom'+msg.data.enterTheRoom+'に入室されました。');
                  break;
          }
        },

		/* on render callback */
		onRender: function() {}
	});

});
