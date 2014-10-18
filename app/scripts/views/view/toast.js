define([
    'backbone',
    'communicator'
],
    function (Backbone, Communicator) {
        'use strict';

        /* Return a Layout class definition */
        return Backbone.Marionette.Layout.extend({

            initialize: function () {
                console.log("initialize a Toast Layout");
                this.bindUIElements();
                Communicator.command.setHandler('showToast', this.showToast, this);
                var that = this;
                this.$el.on('webkitTransitionEnd', function () {
                    $(this).css({
                        'margin-left': '',
                        'left': ''
                    });
                    that.toastTimer = false;
                });
            },

            className: 'toast',

            /* Layout sub regions */
            regions: {
            },

            /* ui selector cache */
            ui: {
                'message': '.toast-message'
            },

            /* Ui events hash */
            events: {},

            showToast: function (message) {
                this.ui.message.text(message);
                if (this.toastTimer) {
                    clearTimeout(this.toastTimer);
                } else {
                    _.defer(function ($el) {
                        $el.css({
                            'margin-left': '-' + $el.outerWidth(true) / 2 + 'px',
                            'left': '50%'
                        });
                        $el.removeClass('toast-hide');
                    }, this.$el);
                }
                this.toastTimer = setTimeout(function ($el) {
                    $el.addClass('toast-hide');
                }, 2000, this.$el);
            },

            /* on render callback */
            onRender: function () {
            }
        });

    });
