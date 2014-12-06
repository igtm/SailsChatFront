(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/RoomItemV'
		],
		function( Roomitemv ) {

			describe('Roomitemv Itemview', function () {

				it('should be an instance of Roomitemv Itemview', function () {
					var RoomItemV = new Roomitemv();
					expect( RoomItemV ).to.be.an.instanceof( Roomitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );