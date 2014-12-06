define([
	'backbone',
	'hbs!tmpl/item/RoomItemV_tmpl'
],
function( Backbone, RoomitemvTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Roomitemv ItemView");
		},
		
    	template: RoomitemvTmpl,

        tagName: 'li',
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
