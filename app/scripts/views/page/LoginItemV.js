define([
	'backbone',
	'hbs!tmpl/page/LoginItemV_tmpl',
    'communicator',
    'io'

    ],
function( Backbone, LoginitemvTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Loginitemv ItemView");
            Communicator.command.execute('setInfo','ログイン');
        },

    	template: LoginitemvTmpl,

        className: "page",
    	/* ui selector cache */
    	ui: {
            "name":'#Login_name'
        },

		/* Ui events hash */
		events: {
            'tap #Login_button': 'onTap'
        },

        onTap: function(){
            var name = this.ui.name.val();
            if(name == '')return;
            // make sure the url is correct (GET /user/login)
            var UserModel = Communicator.reqres.request("DM:getData",'user');
            UserModel.fetch({
                data: {name: name},
                success: _.bind(function(model, res, options){
                    UserModel.subscribe();
                    Communicator.command.execute('changePage','top');
                },this)
            });
        },

        /* on render callback */
		onRender: function() {}
	});

});
