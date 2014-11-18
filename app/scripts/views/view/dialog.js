define([
		'backbone',
		'communicator',
		'hbs!tmpl/view/dialog_tmpl',
		'hbs!tmpl/view/dialog_picker_tmpl',
		'hbs!tmpl/view/dialog_alert_tmpl',
		'hbs!tmpl/view/dialog_prompt_tmpl',
		'hbs!tmpl/view/dialog_progress_tmpl'
	],
	function (Backbone, Communicator, DialogTmpl, DialogPickerTmpl, DialogAlertTmpl, DialogPromptTmpl, DialogProgressTmpl) {
		'use strict';

		/* Return a Layout class definition */
		return Backbone.Marionette.ItemView.extend({

			tagName: "div",

			initialize: function () {
				console.log("initialize a Dialog Layout");
				Communicator.command.setHandler('showDialog', this.showDialog, this);
				Communicator.command.setHandler('hideDialog', this.hideDialog, this);
				this.listenTo(Communicator.mediator, 'resize', this.dialogRender);
			},

			template: DialogTmpl,

			/* ui selector cache */
			ui: {
				'panel': '.dialog-panel',
				'title': '.dialog-title',
				'content': '.dialog-content',
				'buttons': '.dialog-buttons',
				'ok': '#dialog-ok-button',
				'cancel': '#dialog-cancel-button'
			},

			/* Ui events hash */
			events: {
				'tap @ui.ok': 'ok',
				'tap @ui.cancel': 'cancel'
			},

			/**
			 * ダイアログの制御
			 *
			 * @param {string} dialogType - ダイアログの種類
			 * @param {object} options - ダイアログのオプション
			 */
			showDialog: function (dialogType, options) {
				if (this.isDialogShown) {
					this.hideDialog();
				}
				this.isDialogShown = true;

				var ok = (options.ok || function () {
				});
				var cancel = (options.cancel || function () {
				});

				switch (dialogType) {
					case "alert":
						this.showAlert(options.title, options.message, ok, options.buttonName);
						break;
					case "confirm":
						this.showConfirm(options.title, options.message, ok, cancel, options.buttonNames);
						break;
					case "prompt":
						this.showPrompt(options.title, options.message, ok, cancel, options.buttonNames, options.defaultText, options.isSecure);
						break;
					case "progress":
						this.showProgress(options.title, options.message);
						break;
					case "picker":
						this.showPicker(options.title, options.data, ok, cancel, options.defaultIndex);
						break;
				}
			},

			/**
			 * Alertの表示
			 *
			 * @param {string} title - タイトル
			 * @param {string} message - メッセージ
			 * @param {function} ok - callback関数
			 * @param {string} [buttonName=OK] - ボタンの名前
			 */
			showAlert: function (title, message, ok, buttonName) {
				console.log('showAlert');
				var _title = (title || "Alert");
				var _message = (message || "This message is Default.");
				var _ok = (ok || function () {
				});
				var _buttonName = (buttonName || "OK");
				if (navigator && navigator.notification && navigator.notification.alert) {
					console.log("Show native Dialog");
					console.log(_message, _title, _buttonName);
					navigator.notification.alert(_message, _ok, _title, _buttonName);
				} else {
					console.log("No native dialogs");
					var $content = $(Backbone.Marionette.Renderer.render(DialogAlertTmpl, {message: _message}));
					this.showHTMLDialog(_title, $content, _ok, null, [_buttonName]);
				}
			},

			/**
			 * Confirmの表示
			 *
			 * @param {string} title - タイトル
			 * @param {string} message - メッセージ
			 * @param {function} ok - OKが押された時のcallback関数
			 * @param {function} cancel - Cancelが押された時のcallback関数
			 * @param {array} [buttonNames=¥[OK,Cancel¥]] - ボタンの名前
			 */
			showConfirm: function (title, message, ok, cancel, buttonNames) {
				var _title = (title || "Alert");
				var _message = (message || "This message is Default.");
				var _callback = function (buttonIndex) {
					if (buttonIndex == 1) {
						ok();
					} else {
						cancel();
					}
				};
				var _buttonNames = (buttonNames || ["OK", "Cancel"]);
				if (navigator && navigator.notification && navigator.notification.confirm) {
					navigator.notification.confirm(_message, _callback, _title, _buttonNames);
				} else {
					console.log("No native");
					var $content = $(Backbone.Marionette.Renderer.render(DialogAlertTmpl, {message: _message}));
					this.showHTMLDialog(_title, $content, ok, cancel, _buttonNames);
				}
			},

			/**
			 * Prompt(入力フィールド付きDialog)を表示
			 *
			 * @param {string} title - タイトル
			 * @param {string} message - メッセージ
			 * @param {function} ok - OKが押された時のcallback関数(引数に入力された値)
			 * @param {function} cancel - Cancelが押された時のcallback関数
			 * @param {array} [buttonNames=¥[OK,Cancel¥]] - ボタンの名前
			 * @param {string} [defaultText] - デフォルトのテキスト
			 * @param {boolean} [isSecure] - SecureInputの有無
			 */
			showPrompt: function (title, message, ok, cancel, buttonNames, defaultText, isSecure) {
				var _title = (title || "Alert");
				var _message = (message || "This message is Default.");
				var _callback = function (results) {
					if (results.buttonIndex == 1) {
						ok(results.input1);
					} else {
						cancel();
					}
				};
				var _buttonNames = (buttonNames || ["OK", "Cancel"]);
				var _defaultText = (defaultText || "");
				var _promptType = (isSecure) ? "secure" : "normal";
				if (navigator && navigator.notification && navigator.notification.prompt) {
					navigator.notification.prompt(_message, _callback, _title, _buttonNames, _defaultText, _promptType);
				} else {
					var $content = $(Backbone.Marionette.Renderer.render(DialogPromptTmpl, {
						message: _message,
						defaultText: _defaultText,
						isSecure: isSecure
					}));
					var _ok = function () {
						ok($content.siblings('input').val());
					};
					this.showHTMLDialog(_title, $content, _ok, cancel, _buttonNames);
				}
			},

			/**
			 * Progressの表示
			 * @param {string} title - タイトル
			 * @param {string} message - メッセージ
			 * @param {string} [type=simple] - (未実装)ProgressDialogのタイプ(simple | bar)
			 * @param {string} [value] - (未実装)進捗状況(1-100)
			 */
			showProgress: function (title, message, type, value) {
				console.log("Show Progress");
				var _title = (title || "Loading...");
				var _message = (message || "");
				var isDialogCreated = false;
				var $content = "";

				if ((window.device && window.device.platform == "iOS") || ua.isiOS) {
					console.log("iOS");
					if (window.ProgressIndicator) {
						console.log("Native");
						if (_.isEmpty(_message)) {
							window.ProgressIndicator.showSimpleWithLabel(false, _title);
							isDialogCreated = true;
						}
						else {
							window.ProgressIndicator.showSimpleWithLabelDetail(false, _title, _message);
							isDialogCreated = true;
						}
					}

					if (!isDialogCreated) {
						$content = $(Backbone.Marionette.Renderer.render(DialogProgressTmpl, {
							title: _title,
							message: _message
						}));
					}
				} else if ((window.device && window.device.platform == "Android") || ua.isAndroid) {
					if (navigator && navigator.notification && navigator.notification.activityStart) {
						navigator.notification.activityStart(_title, _message);
						isDialogCreated = true;
					}
					if (!isDialogCreated) {
						$content = $(Backbone.Marionette.Renderer.render(DialogProgressTmpl, {
							title: "",
							message: _message
						}));
					}
				}

				if (!isDialogCreated) {
					this.showHTMLDialog(_title, $content);
				}
			},

			/**
			 * Pickerの表示
			 *
			 * @param {string} title - [Androidのみ]タイトル
			 * @param {array} data - リストデータ
			 * @param {function} ok - OKが押された時のcallback関数(引数に入力された値)
			 * @param {function} cancel - Cancelが押された時のcallback関数
			 * @param {number} defaultIndex - [iOSのみ]Defaultの選択肢
			 */
			showPicker: function (title, data, ok, cancel, defaultIndex) {
				var _title = (title || "Please Pick");
				var _data = (data || ["List1", "List2"]);
				var _callback = function (result) {
					if (result.buttonIndex == 1) {
						ok(result.selectedIndex);
					} else {
						cancel();
					}
				};
				var _defaultIndex = (defaultIndex || 0);
				var isDialogCreated = false;

				if ((window.device && window.device.platform == "iOS") || ua.isiOS) {
					console.log("show native");
					if (window.PickerView && window.PickerView.show) {
						window.PickerView.show(_data, _defaultIndex, _callback);
						isDialogCreated = true;
					}
				}
				else if ((window.device && window.device.platform == "Android") || ua.isAndroid) {
					if (navigator && navigator.notification && navigator.notification.list) {
						navigator.notification.list(_title, _data, _callback);
						isDialogCreated = true;
					}
				}

				if (!isDialogCreated) {
					var options = _.map(_data, function (option, index) {
						return {val: option, selected: index == _defaultIndex}
					});
					var $content = $(Backbone.Marionette.Renderer.render(DialogPickerTmpl, {
						options: options
					}));
					var hide = _.bind(this.hideDialog, this);
					$content.siblings('div').on('tap', function (e) {
						hide();
						ok($(e.currentTarget).attr('data-index'));
					});
					this.showHTMLDialog(_title, $content, cancel, null, ["Cancel"]);
				}
			},

			/**
			 * HTML版のDialogを表示
			 *
			 * @param {string} title - タイトル
			 * @param {object} $content - 表示データ
			 * @param {function} ok - OKが押された時のcallback関数(引数に入力された値)
			 * @param {function} cancel - Cancelが押された時のcallback関数
			 * @param {array} buttonNames - ボタンの名前
			 */
			showHTMLDialog: function (title, $content, ok, cancel, buttonNames) {
				this.ui.title.text(title);
				this.ui.content.empty().append($content);
				if (_.isUndefined(buttonNames) || buttonNames == 0) {
					this.ui.buttons.hide();
					this.ui.ok.hide();
					this.ui.cancel.hide();
				} else if (buttonNames.length == 1) {
					this.ui.buttons.show();
					this.ui.ok.text(buttonNames[0]);
					this.ui.ok.show();
					this.ui.cancel.hide();
					this.okCallback = ok;
				} else if (buttonNames.length == 2) {
					this.ui.buttons.show();
					this.ui.ok.text(buttonNames[0]);
					this.ui.ok.show();
					this.okCallback = ok;
					this.ui.cancel.text(buttonNames[1]);
					this.ui.cancel.show();
					this.cancelCallback = cancel;
				}

				this.dialogRender();
				this.$el.show();
			},

			hideDialog: function () {
				console.log("Hide Dialog");
				this.isDialogShown = false;
				this.$el.hide();
				this.ui.panel.addClass("dialog-prepare");
				if (ua.isiOS && window.ProgressIndicator)
					window.ProgressIndicator.hide();
				else if (ua.isAndroid && window.navigator && window.navigator.notification && window.navigator.notification.activityStop)
					window.navigator.notification.activityStop();
			},

			ok: function () {
				this.hideDialog();
				if (_.isFunction(this.okCallback)) {
					this.okCallback();
				}
			},

			cancel: function () {
				this.hideDialog();
				if (_.isFunction(this.cancelCallback)) {
					this.cancelCallback();
				}
			},

			dialogRender: function () {
				console.log("Dialog Render");
				if (!this.ui.panel.hasClass("dialog-prepare")) {
					this.ui.panel.addClass("dialog-prepare");
				}
				this.ui.panel.css('max-height', this.$el.height() * 0.8);
				_.defer(function (panel) {
					panel.css({
						'margin-top': '-' + (panel.height() / 2) + 'px',
						'margin-left': '-' + (panel.width() / 2) + 'px'
					});

					//CSSの適用に時間がかかるため表示を遅らせる
					_.delay(function () {
						panel.removeClass('dialog-prepare');
					}, 50);
				}, this.ui.panel);
			},

			/* on render callback */
			onRender: function () {
			}
		});

	});
