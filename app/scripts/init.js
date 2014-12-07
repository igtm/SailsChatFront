require.config({

    baseUrl: "/scripts",

    /* starting point for application */
    deps: ['backbone.marionette', 'backbone.stickit', 'bootstrap', 'main'],


    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        uajudge: {
            deps: ['jquery']
        },
        momentjs: {
            deps: ['moment']
        },
        'zepto.touch': {
            deps: ['jquery']
        }
    },

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: '../bower_components/bootstrap-sass/dist/js/bootstrap',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',
        tmpl: "../templates",

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../bower_components/require-handlebars-plugin/handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs',

        /* libs */
        //iscroll: 'vendor/iscroll',
        websql: 'vendor/backbone-websql',
        'zepto.touch': 'vendor/zepto.touch',
        uajudge: 'vendor/searchua.min',
        moment: '../bower_components/momentjs/moment',
        momentja: '../bower_components/momentjs/lang/ja',
        'backbone.stickit': '../bower_components/backbone.stickit/backbone.stickit',
        'io': 'vendor/sails.io',
        'pageManager': 'vendor/page_manager'
    },

    hbs: {
        disableI18n: true
    }
});