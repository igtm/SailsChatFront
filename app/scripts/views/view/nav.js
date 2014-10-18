define([
    'backbone',
    'communicator',
    'hbs!tmpl/view/nav_tmpl'
],
    function (Backbone, Communicator,NavTmpl) {
        'use strict';

        /* Return a Viewt class definition */
        return Backbone.Marionette.Layout.extend({

            initialize: function () {
                console.log("initialize a Nav View");
                Communicator.command.setHandler('toggleNav', this.toggleNav, this);
                Communicator.command.setHandler('closeNav', this.closeNav, this);

                this.main = $('#main');
                this.navWidth = this.$el.outerWidth(true);
                this.listenTo(Communicator.mediator, 'resize', function () {
                    this.navWidth = this.$el.outerWidth(true);
                    this.closeNav();
                }, this);

                this.initMask();

                this.navStatus = 0;
                this.listenTo(this, 'animEnd', function (state) {
                    this.navStatus = state;
                    if (state == 0) {
                        this.main.css({
                            'width': $(window).width()
                        });
                        this.$el.css({
                            'z-index': ''
                        });
                    }
                });
            },

            template: NavTmpl,

            /* Layout sub regions */
            regions: {},

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {
                'tap div[data-action]': 'action'
            },

            action: function (e) {
                var action = $(e.currentTarget).attr('data-action');
                switch (action) {
                    case 'edit':
                        Communicator.command.execute('changePage', 'category');
                        break;
                    case 'setting':
                        Communicator.command.execute('changePage', 'preference');
                        break;
                    case 'logout':
                        Communicator.command.execute('logout');
                        break;
                    case 'all':
                    case 'favorite':
                        Communicator.command.execute('changePage', 'timeline', action);
                        break;
                }
                this.closeNav();
            },

            toggleNav: function () {
                switch (this.navStatus) {
                    case 0:
                        this.openNav();
                        break;
                    case 1:
                        this.closeNav();
                        break;
                }
            },

            openNav: function () {
                if (ua.isiOS && typeof StatusBar !== 'undefined') {
                    StatusBar.hide();
                } else if (ua.isAndroid) {
                    $(document).on('backbutton', function () {
                        Communicator.command.execute('closeNav');
                    });
                }
                if (this.navStatus != 0)
                    return;
                this.main.css({
                    'width': '',
                    'transition': '-webkit-transform 200ms ease-in-out 0ms',
                    '-webkit-transition': '-webkit-transform 200ms ease-in-out 0ms',
                    '-webkit-transform': 'translate3d(' + this.navWidth + 'px,0,0)'
                });
                this.$el.css({
                    'z-index': 1
                });
                this.navStatus = 2;

                var thisView = this;
                this.main.one('webkitTransitionEnd', function () {
                    thisView.trigger('animEnd', 1);
                });
                this.mask.show();
                this.mask.on('tap', function () {
                    Communicator.command.execute('closeNav');
                });
            },

            closeNav: function () {
                if (ua.isiOS && typeof StatusBar !== 'undefined') {
                    StatusBar.show();
                } else if (ua.isAndroid) {
                    $(document).off('backbutton');
                }
                if (this.navStatus != 1)
                    return;
                //console.log("menuClose");
                this.main.css({
                    'transition': '-webkit-transform 200ms ease-in-out 0ms',
                    '-webkit-transition': '-webkit-transform 200ms ease-in-out 0ms',
                    '-webkit-transform': 'translate3d(0,0,0)'
                });
                this.navStatus = 2;

                var thisView = this;
                this.main.one('webkitTransitionEnd', function () {
                    thisView.trigger('animEnd', 0);
                });
                this.mask.hide();
                this.mask.off('tap');
            },

            initMask: function () {
                this.mask = $('#mask');
            },

            /* on render callback */
            onRender: function () {
            }
        });

    });
