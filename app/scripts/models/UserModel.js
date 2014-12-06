define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Usermodel model");
            this.base_url = window.app.BASE_URL + 'user';
            this.url = this.base_url + '/login';
        },
        base_url: '',

        url: '',// 初期設定

        changePath: function(path){
            this.url = this.base_url + '/' + path;
        },

		defaults: {},

        subscribe: function(){
            console.log('subscribe');
            this.changePath('subscribe');
            var id = this.get('id');
            io.socket.post(this.url,{id: id});
        }
    });
});
