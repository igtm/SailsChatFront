define([
		'backbone',
		'communicator',
		'routers/router',
		'regions/content',
		'views/view/nav',
		'views/view/header',
		'views/view/dialog',
		'modules/data_manager',
		'zepto.touch',
		'uajudge'
	],

	function (Backbone, Communicator, Router, ContentRegion, NavView, HeaderView, DialogView, DataManager) {
		'use strict';

		var App = new Backbone.Marionette.Application();
		App.module("DataManager", DataManager);

		/* Add application regions here */
		App.addRegions({
			'header': '#header',
			'content': {
				selector: "#content",
				regionType: ContentRegion
			},
			'dialog': '#dialog',
			'nav': '#nav',
			'toast': '#toast'
		});

		/* Add initializers here */
		App.addInitializer(function () {
			/*  window.console.log = function () {
			 };*/
			//Phonegapのプラグイン使用準備
			document.addEventListener('deviceready', function () {
				console.log('Device is Ready');
				//AndroidのBack Buttonの制御
				document.addEventListener("backbutton", function () {
					Communicator.command.execute('back');
				}, false);
			}, false);

			//レイアウトの初期化
			//App.nav.attachView(new NavView({el: App.nav.el}));
			App.header.attachView(new HeaderView({el: App.header.el}));
			App.dialog.attachView(new DialogView({el: App.dialog.el}).render());
			//App.toast.attachView(new ToastView({el: App.toast.el}));

			//端末に応じて画面回転のリスナーを設定
			var $win = $(window);
			if (ua.isiOS) {
				//resizeイベントは複数発火してしまう
				//browserでは発火しない
				$win.bind('resize', function () {
					console.log("resize");
					Communicator.mediator.trigger('resize');
				});
			}
			if (ua.isAndroid) {
				$win.bind('resize', function () {
					Communicator.mediator.trigger('resize');
				});
			}
			if (ua.isiPad || ua.isTablet) {
				console.log("isTablet");
				$('html').css('font-size', '75%');
				Communicator.mediator.trigger('resize');
			}

			_.delay(function () {
				Communicator.command.execute("showDialog", 'prompt', {
					title: "Build is Success",
					message: "Hello World!! ",
					buttonNames: ["o-k-", "cancel-"],
					data: ["test1", "test2", "test3", "test4","test1", "test2", "test3", "test4"],
					ok: function (text) {
						console.log("OK is Worked " + text);
					},
					cancel: function () {
						console.log("Cancel is worked");
					},
					defaultIndex: 3,
					isSecure: false,
					defaultText: "test"
				});
			}, 1000);

			this.listenToOnce(App.DataManager, 'DB:ready', function () {
				//ルーター準備
				new Router();
				Backbone.history.start();
				Communicator.command.execute('changePage', 'firstPage');
			});
			App.DataManager.start();
		});

		return App;
	});
