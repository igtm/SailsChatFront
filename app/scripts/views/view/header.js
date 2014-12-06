define([
    'backbone',
    'communicator'
],
    function (Backbone, Communicator) {
        'use strict';


        return Backbone.Marionette.Layout.extend({
            initialize: function () {
                console.log("initialize a HeaderView View");
                this.bindUIElements();
                Communicator.command.setHandler('changeHeader', this.changeMode, this);
                Communicator.command.setHandler('setInfo', this.setInfo, this);
            },

            ui: {
                'back': '.header-back',
                'setting': '.header-setting',
                'info': '.header-info',
                'padding': '.header-padding'
            },

            events: {
                'tap [data-action]': 'action'
            },

            action: function (e) {
                var action = $(e.currentTarget).attr('data-action');
                console.log(action);
                switch (action) {
                    case "back":
                        Communicator.command.execute('back');
                        break;
                    case "setting":
                        Communicator.command.execute('changePage', 'preference');
                        break;
                    case "dropbox":
                        Communicator.command.execute('toggleCategory');
                        break;
                    case "camera":
                        Communicator.command.execute('upCamera');
                        break;
                    case "user":
                        Communicator.command.execute('user');
                        break;
                }
            },

            changeMode: function (mode, options) {
                console.log(mode);
                if (this.mode != mode) {
                    switch (mode) {
                        case 'login':
                            this.displayElements(['info']);
                            break;
                        case 'top':
                            this.displayElements(['info']);
                            break;
                        case 'room':
                            this.displayElements(['back', 'info']);
                            break;
                    }
                    this.mode = mode;
                    if (this.mode == "fghfh") {
                        Communicator.command.execute('setBackHandler', function () {
                            Communicator.command.execute('changePage', 'top');
                        });
                    } else {
                        Communicator.command.execute('setBackHandler');
                    }
                }
            },

            displayElements: function (showElements) {
                _.each(this.ui, function (ele, eleName) {
                    if (showElements.indexOf(eleName) != -1) {
                        ele.show();
                    } else {
                        ele.hide();
                    }
                });
            },

            setInfo: function (title) {
                this.ui.info.text(title);
            },

            toggleFavorite: function () {
                this.isFavorite = !this.isFavorite;
                this.toggleFavoriteIcon(this.isFavorite);
                Communicator.mediator.trigger('favorite', this.isFavorite);
            },

            toggleFavoriteIcon: function (isFavorite) {
                var icon = this.ui.favorite.find('i');
                if (isFavorite) {
                    icon.addClass('fa-bookmark').removeClass('fa-bookmark-o');
                } else {
                    icon.addClass('fa-bookmark-o').removeClass('fa-bookmark');
                }
            },

            openNav: function (e) {
                e.preventDefault();
                e.stopPropagation();
                Communicator.command.execute('toggleNav');
            }
        });
    });
