(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/LoginItemV'
		],
		function( Loginitemv ) {

			describe('Loginitemv Itemview', function () {

				it('should be an instance of Loginitemv Itemview', function () {
					var LoginItemV = new Loginitemv();
					expect( LoginItemV ).to.be.an.instanceof( Loginitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );