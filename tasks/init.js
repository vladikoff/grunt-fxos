'use strict';

module.exports = function (grunt) {
    var exec = require('child_process').exec;
    var init = require('./lib/init').init(grunt);

    /**
     * init task that lists all available application templates
     */
    grunt.registerTask('fxos-init', 'FirefoxOS template initializer', function () {
        grunt.log.writeln('Work in progress...');
    });

};
