'use strict';

module.exports = function (grunt) {
  var simulator = require('./lib/simulator').init(grunt);

  grunt.registerTask('fxos-sim', 'Open Firefox simulator', function () {
    var fs = require('fs'),
      exec = require('child_process').exec;

    var fxos = require('./lib/fxos').init(grunt);

    // async task
    var done = this.async();
    // the adb command to save the file
    grunt.file.mkdir(fxos.TEMP_PATH);

    // make sure the simulator file is there
    simulator.prepare(function () {
      grunt.log.ok('Simulator Loading...');

      // TODO: FOR OS X ONLY
      // exec for image detach
      exec('hdiutil detach /Volumes/B2G', function(error) {
        // exec attach simulator dmg
        exec('hdiutil attach ' + simulator.simFilePath + ' -nobrowse', function (error, stdout, stderr) {
            // exec simulator run.
            var simRun = '/Volumes/B2G/B2G.app/Contents/MacOS/b2g -profile ' + __dirname + '/misc/profile --dbgport 6771 ';
            grunt.log.writeln('>> Running: ' + simRun);
            exec(simRun);
        });

      });
    });


  });
};
