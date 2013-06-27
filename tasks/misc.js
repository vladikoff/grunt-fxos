'use strict';

module.exports = function (grunt) {
  var misc = require('./lib/misc').init(grunt);

  var os = require('os');
  var fs = require('fs');

  grunt.registerTask('fxos', 'Intro task', function () {
    grunt.log.ok('\nWelcome to Grunt FirefoxOS Toolkit');
    grunt.log.ok('\nRun "grunt -h" to see available commands.');
    grunt.log.ok('\nRun "grunt fxos-init" to start a new project.');

    grunt.task.run(['fxos-env']);
  });

  grunt.registerTask('fxos-env', 'Checks your environment for tools (adb, git, ...)', function () {
    var done = this.async();
    // validate commands
    var commands = [
      { name: 'adb', help: 'You need adb to do almost everything.' },
      { name: 'git', required: true, help: 'You need git for everything.' },
      { name: 'pip', help: '' },
      { name: 'fastboot', help: 'You need fastboot if you plan to use fxos-flash' },
      { name: 'xpcshell -v', help: 'You need xpcshell if you plan to use fxos-deploy' },
      { name: 'python -h', help: '[Optional] Use for pretty adb output' }
    ];

    var compNote =
      '\nIf you are missing any required components below, \n' +
        'then please add them to your PATH or configure the path in the \'.firefoxos\' file. \n' +
        'See http://github.com/vladikoff/grunt-fxos for details.\n';
    grunt.log.writeln(compNote);

    grunt.log.ok('Platform: ' + os.platform());
    grunt.log.ok('Node: ' + process.version);

    commands.forEach(function (c, idx) {
      misc.cmdAvailable(c.name, function (available) {
        if (available) {
          grunt.log.ok('\'' + c.name.split(' ')[0] + '\'' + ' is available');
        } else {
          grunt.log.writeln('>> \'' + c.name.split(' ')[0] + '\' is missing. *** Help: ' + c.help);
          if (c.required) {
            grunt.log.warn('!!! Warning: ' + c.name + ' is required. Please install it or add to \'.firefoxos\' file !!!');
          }
        }
        if (idx === commands.length) {

          done(true);
        }
      });
    });

  });

};
