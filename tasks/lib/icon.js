'use strict';

exports.init = function(grunt) {
  var exports = {};

  exports.savePath = function () {
    var path = '';

    // Gruntfile config for app directory
    var fxConf = grunt.config('fxos');

    // if we got config and options
    if (fxConf && fxConf.options) {
      var opts = fxConf.options;

      // if there's a source for the app
      if (opts.src) {
        path = opts.src;
      }

      // if there's an icon config and a dest for icons
      if (opts.icon && opts.icon.dest) {
        path = opts.icon.dest;
      }
    }

    // --path arg
    var cliPath = grunt.option('path');

    if (cliPath) {
      path = cliPath  + '/';
    }

    return path;
  };

  return exports;
};
