'use strict';

exports.init = function(grunt) {
    var exec = require('child_process').exec;
    var fxos = require('./fxos').init(grunt);

    exports.cmdAvailable = function(cmd, callback) {
        exec(fxos.run(cmd), function (error) {
            //console.log(cmd, error);
            callback(error == null || error.code === 1 || error.code == null);
        });
    };

    return exports;
};
