(function() {
	'use strict';

	var root = this;

	root.define([
		'models/UserModel'
		],
		function( Usermodel ) {

			describe('Usermodel Model', function () {

				it('should be an instance of Usermodel Model', function () {
					var UserModel = new Usermodel();
					expect( UserModel ).to.be.an.instanceof( Usermodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );