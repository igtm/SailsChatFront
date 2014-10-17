define([
    'backbone',
    'communicator',
    'hbs!tmpl/view/dialog_tmpl',
    'hbs!tmpl/view/dialog_list_tmpl'
],
    function (Backbone, Communicator, DialogTmpl, DialogListTmpl) {
        'use strict';

        /* Return a Layout class definition */
        return Backbone.Marionette.ItemView.extend({

            tagName: "div",

            initialize: function () {
                console.log("initialize a Dialog Layout");
                Communicator.command.setHandler('showDialog', this.showDialog, this);
                Communicator.command.setHandler('hideDialog', this.hideDialog, this);
                this.listenTo(Communicator.mediator, 'resize', this.onRender);
            },

            template: DialogTmpl,

            /* ui selector cache */
            ui: {
                'panel': '.dialog-panel',
                'title': '#dialog-title',
                'content': '#dialog-content',
                'buttons': '.dialog-buttons',
                'ok': '#dialog-ok-button',
                'cancel': '#dialog-cancel-button'
            },

            /* Ui events hash */
            events: {
                'tap #dialog-ok-button': 'ok',
                'tap #dialog-cancel-button': 'cancel'
            },

            showDialog: function (options) {
                this.ui.title.hide();
                this.ui.content.attr('class', 'dialog-content').hide();
                this.ui.ok.hide();
                this.ui.cancel.hide();
                this.ui.buttons.hide();
                this.ui.panel.addClass('dialog-ready');

                if (options.hasOwnProperty('template')) {
                    console.log("Prepare View of " + options.template);
                    this.getTemplateView(options.template, options);
                } else {
                    this.ui.title.html(options.title);
                    this.ui.content.html(options.message);

                    if (options.hasOwnProperty('ok')) {
                        this.okFunc = options.ok;
                        this.ui.ok.show();
                        this.ui.buttons.show();
                    } else {
                        this.okFunc = function () {
                        };
                    }

                    if (options.hasOwnProperty('cancel')) {
                        this.cancelFunc = options.cancel;
                        this.ui.cancel.show();
                        this.ui.buttons.show();
                    } else {
                        this.cancelFunc = function () {
                        };
                    }
                    this.ui.title.show();
                    this.ui.content.show();
                }
                this.onRender();

                this.$el.addClass('dialog-show').removeClass('dialog-hide');
                console.log("Show Dialog");
            },

            hideDialog: function () {
                console.log("Hide Dialog");
                this.$el.addClass('dialog-hide').removeClass('dialog-show');
            },

            ok: function () {
                this.okFunc();
                this.hideDialog();
            },

            cancel: function () {
                this.cancelFunc();
                this.hideDialog();
            },

            getTemplateView: function (templateName, options) {
                switch (templateName) {
                    case 'update':
                        var img = $('<i class="fa fa-refresh fa-2x fa-spin"></i>').css({"vertical-align": "middle", "margin-right": "1rem"});
                        this.ui.content.html(img.get(0).outerHTML + '旧バージョンから更新中...').css('text-align', 'left');
                        this.ui.content.show();
                        break;
                    case 'accessServer':
                        var img = $('<i class="fa fa-refresh fa-2x fa-spin"></i>').css({"vertical-align": "middle", "margin-right": "1rem"});
                        this.ui.content.html(img.get(0).outerHTML + '情報取得中...').css('text-align', 'left');
                        this.ui.content.show();
                        break;
                    case 'timeout':
                        this.ui.title.text('エラー');
                        this.ui.content.html("サーバーとの通信に失敗しました。<BR>お手数ですがネットワーク環境をご確認の上再度お試しください。");
                        this.okFunc = function () {
                        };

                        this.ui.title.show();
                        this.ui.content.show();
                        this.ui.ok.show();
                        this.ui.buttons.show();
                        break;
                    case 'list':
                        this.ui.title.text(options.title);
                        this.ui.content.html(this.getListView(options.options));
                        var hide = _.bind(this.hideDialog, this);
                        this.ui.content.find('.dialog-list-item').bind('tap', function (e) {
                            options.callback($(e.currentTarget).text(), $(e.currentTarget).attr("data-action"));
                            hide();
                        });
                        this.cancelFunc = function () {
                        };

                        this.ui.title.show();
                        this.ui.content.addClass('dialog-list').show();
                        this.ui.buttons.show();
                        this.ui.cancel.show();
                        break;
                    case 'input':
                        this.ui.title.text(options.title);
                        var input = $('<input type="text" class="dialog-input">');
                        input.val(options.value);
                        this.ui.content.html(input);
                        this.okFunc = function () {
                            options.ok(input.val());
                        };
                        this.cancelFunc = function () {
                        };

                        this.ui.title.show();
                        this.ui.content.show();
                        this.ui.buttons.show();
                        this.ui.ok.show();
                        this.ui.cancel.show();
                        break;
                }
            },

            getListView: function (data) {
                var values;
                if (_.isArray(data)) {
                    values = data;
                } else {
                    values = _.keys(data);
                }
                return Backbone.Marionette.Renderer.render(DialogListTmpl, {values: values});
            },

            /* on render callback */
            onRender: function () {
                this.ui.panel.css('max-height', this.$el.height() * 0.8);
                _.defer(function (panel) {
                    panel.css({
                        'margin-top': '-' + (panel.height() / 2) + 'px',
                        'margin-left': '-' + (panel.width() / 2) + 'px'
                    });
                    _.defer(function () {
                        panel.removeClass('dialog-ready');
                    });
                }, this.ui.panel);
            }
        });

    });
