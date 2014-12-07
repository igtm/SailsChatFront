define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({

        initialize: function () {
            console.log("initialize a Class model");
            this.base_url = window.app.BASE_URL + 'chat';
        },

        base_url: '',

        url: '',

        defaults: {
        }
    });
});
