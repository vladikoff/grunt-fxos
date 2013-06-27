'use strict';

module.exports = function (grunt) {

  grunt.registerTask('fxos-screenshot', 'Takes a screenshot from the currently connect Firefox OS device.', function () {
    var fs = require('fs'),
      exec = require('child_process').exec;

    // async task
    var done = this.async();
    // dynamic file name
    var file = 'screen' + new Date().getTime() + '.png';
    // where to save the file
    var savePath = 'tmp/' + file;
    // the adb command to save the file
    var cmd =
      'adb shell screencap -p /sdcard/' + file + ' && ' +
      'adb pull /sdcard/' + file + ' ' + savePath + ' && ' +
      'adb shell rm /sdcard/' + file;

    // grunt.log.ok('Running ' + cmd);

    // run the command
    exec(cmd, function (e, stdout, stderr) {
      if (e) {
        grunt.log.warn(e);
        done(false);
      }

      grunt.log.write(stdout);
      grunt.log.write(stderr);
      grunt.log.ok("Saved to " + savePath);
      done(true);
    });
  });
};
