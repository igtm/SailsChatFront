define([
		'backbone',
		'communicator',
		'hbs!tmpl/page/license_tmpl'
	],
	function (Backbone, Communicator, LicenseTmpl) {
		'use strict';
		/* Return a Layout class definition */
		return Backbone.Marionette.Layout.extend({
			className: "page",

			initialize: function () {
				console.log("initialize a License Page");
				this.$el.attr('id', 'license');
				//使っていないOSSはコメントアウトする
				this.usedLicenses = [
					//cordova関連
					"cordova",
					"cordova-dialog",
					"cordova-inappbrowsee",
					"cordova-device",
					"cordova-statusbar",
					"cordova-progress",
					//framework関連
					"backbone",
					"stickit",
					"underscore",
					"babysitter",
					"wreqr",
					"marionette",
					"jquery",
					"requirejs",
					"bootstrap",
					"fontawesome",
					"modernizr",
					//vendor
					"iscroll",
					"momentjs"
				];
			},

			template: LicenseTmpl,

			/* Layout sub regions */
			regions: {},

			/* ui selector cache */
			ui: {},

			/* Ui events hash */
			events: {},

			onChangePage: function (params) {
			},

			/* on render callback */
			onRender: function () {
				_.each(this.usedLicenses, function (license) {
					this.$el.find('#license-' + license).show();
				}, this);
			}
		});

	});
