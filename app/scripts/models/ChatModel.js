define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({

        initialize: function () {
            console.log("initialize a Class model");
        },

        url: window.app.BASE_URL + "room/chat",

        defaults: {
        }
    });
});
