(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/ChatCollection'
		],
		function( Chatcollection ) {

			describe('Chatcollection Collection', function () {

				it('should be an instance of Chatcollection Collection', function () {
					var ChatCollection = new Chatcollection();
					expect( ChatCollection ).to.be.an.instanceof( Chatcollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );