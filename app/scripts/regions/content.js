define([
		'backbone',
		'communicator',
        'views/page/TopItemV',
        'views/page/RoomCompV',
        'views/page/LoginItemV'
	],
	function (Backbone, Communicator, TopPage, RoomPage, LoginPage) {
		'use strict';

		/* Return a Region class definition */
		return Backbone.Marionette.Region.extend({
			pages: {},
			initialize: function () {
				console.log("initialize a Content Region");
				//$elのセット
				this.ensureEl();
				//コンテントの位置を決定
				this.$el.css('top', $('header').outerHeight(true));
				this.listenTo(Communicator.mediator, 'resize', this.rerender);
				var content = $('#content');
				Communicator.command.setHandler('changeContent', this.changeContent, this);
                this.pages.rooms = [];
                Communicator.reqres.setHandler("Content:getQuery",this.getQuery,this);
			},
            getQuery: function(){
                return this.args;
            },

			//ページの初期化方法
			//ページ保持 or 削除
			initPageView: function (pageName) {
				var view;
				switch (pageName) {
                    case "login":
                        view = new LoginPage();
                        break;
                    case "top":
                        if(!this.pages.TopPage){
                            this.pages.TopPage = new TopPage();
                        }
                        view = this.pages.TopPage;
                        break;
                    case "room":
                        var i = this.args.room_id - 1;
                        if(!this.pages.rooms[i]){
                            this.pages.rooms[i] = new RoomPage({room_id:this.args.room_id});
                        }
                        view = this.pages.rooms[i];

                        break;
					default:
						throw "Not defined PageView"
				}
				return view;
			},

			changeContent: function (pageName, args) {
				this.args = args;
				var previousView = this.currentView;
				var preventClose = false;
				if (previousView) {
                    preventClose = _.contains(this.pages, previousView);
                    // roomsの配列に対応させる。
                    if (!preventClose && this.pages.rooms){
                        preventClose = _.indexOf(this.pages.rooms, previousView) !== -1;
                    }
                }
				var view = this.initPageView(pageName);
				this.show(view, {preventClose: preventClose});

				if (previousView && preventClose) {
					Backbone.Marionette.triggerMethod.call(previousView, 'before:changePage');
					previousView.$el.removeClass('page-show');
				} else if (previousView) {
					previousView.close();
				}
				this.currentView.$el.addClass('page-show');
			},

			// Displays a backbone view instance inside of the region.
			// Handles calling the `render` method for you. Reads content
			// directly from the `el` attribute. Also calls an optional
			// `onShow` and `close` method on your view, just after showing
			// or just before closing the view, respectively.
			// The `preventClose` option can be used to prevent a view from being destroyed on show.
			show: function (view, options) {
				this.ensureEl();

				var showOptions = options || {};
				var isViewClosed = view.isClosed || _.isUndefined(view.$el);
				var isDifferentView = view !== this.currentView;
				var preventClose = !!showOptions.preventClose;

				// only close the view if we don't want to preventClose and the view is different
				var _shouldCloseView = !preventClose && isDifferentView;
				if (_shouldCloseView) {
					this.close();
				}

				//render済みならrenderを行わない
				if (!view._isRendered) {
					view.render();
				}
				Backbone.Marionette.triggerMethod.call(this, "before:show", view);
				Backbone.Marionette.triggerMethod.call(view, "before:show");

				if (isDifferentView || isViewClosed) {
					this.open(view);
				}

				this.currentView = view;

				Backbone.Marionette.triggerMethod.call(this, "show", view);
				Backbone.Marionette.triggerMethod.call(view, "show");
			},

			onShow: function (view) {
				Backbone.Marionette.triggerMethod.call(view, 'changePage', this.args);
			},

			open: function (view) {
				var id = view.$el.attr('id');
				if (_.isUndefined(id) || this.$el.find("#" + id).length == 0) {
					this.$el.append(view.el);
				}
			},

			//画面回転時の処理
			rerender: function () {
				var offset = $('header').outerHeight(true);
				$('#main').css('width', $(window).width());
				var content = $('#content');
				content.css({'top': offset});
				if (this.currentView)
					this.currentView.onRender();
			}
		});

	});
