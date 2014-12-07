/**
 * Created by Tomokatsu on 14/12/07.
 */
define([


],function(){
    return {
        getCurrentHash: function(){
            return location.hash.replace('#','').replace(/\?.*/,'');
        }
    };
});