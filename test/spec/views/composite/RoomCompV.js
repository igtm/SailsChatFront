(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/RoomCompV'
		],
		function( Roomcompv ) {

			describe('Roomcompv Compositeview', function () {

				it('should be an instance of Roomcompv Compositeview', function () {
					var RoomCompV = new Roomcompv();
					expect( RoomCompV ).to.be.an.instanceof( Roomcompv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );