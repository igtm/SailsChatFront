(function() {
	'use strict';

	var root = this;

	root.define([
		'models/ChatModel'
		],
		function( Chatmodel ) {

			describe('Chatmodel Model', function () {

				it('should be an instance of Chatmodel Model', function () {
					var ChatModel = new Chatmodel();
					expect( ChatModel ).to.be.an.instanceof( Chatmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );