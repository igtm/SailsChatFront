(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/TopItemV'
		],
		function( Topitemv ) {

			describe('Topitemv Itemview', function () {

				it('should be an instance of Topitemv Itemview', function () {
					var TopItemV = new Topitemv();
					expect( TopItemV ).to.be.an.instanceof( Topitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );