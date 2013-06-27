'use strict';

module.exports = function (grunt) {
  var exec = require('child_process').exec;
  var Path = require('path');

  var deploy = require('./lib/deploy').init(grunt);
  var fxos = require('./lib/fxos').init(grunt);

  grunt.registerTask('fxos-deploy', 'Deploy to device task', function () {
    var done = this.async();

    // TODO: check app directory

    // TODO: add path param to this
    // Epic hacks
    var grunt = require('grunt');
    grunt.task.init = function() {};
    grunt.initConfig({
      compress: {
        fxosApp: {
          options: {
            archive: '../tmp/application.zip'
          },
          files: [
            { src: ['**'] }
          ]
        }
      }
    });

    var cwd = process.cwd();
    process.chdir(__dirname + '/..');
    grunt.loadNpmTasks('grunt-contrib-compress');
    process.chdir(cwd);

    process.chdir('application');
    /*
    OLD
    var zipCmd = 'zip -Xr ../tmp/application.zip ./*';
    exec(zipCmd, function() {

    });
    */
    // Finally run the tasks, with options and a callback when we're done
    grunt.tasks(['compress'], {}, function() {

      process.chdir(cwd);
      grunt.log.ok('Done packing tasks.');
      var appSrc = 'tmp/application.zip';

      // TODO: check this
      //var appName = Path.basename(process.cwd());
      var appName = 'application';

      var appDest = '/data/local/tmp/b2g/' + appName + '/application.zip';
      grunt.log.writeln('>> Pushing to: ' + appDest);
      exec('adb push ' + appSrc + ' ' + appDest, function (error) {
        if (error) console.log(error);

        grunt.log.ok('Pushed!');
        exec('adb forward tcp:6000 tcp:6000', function (error) {
          if (error) console.log(error);

          grunt.log.writeln('>> Deploying... \n \n *** Accept installation on your device... *** \n');
          var xpcCmd = fxos.run('xpcshell') + __dirname + '/../lib/install.js ' + appName;
          exec(xpcCmd, function (error, stdout, stderr) {

            if (error) console.log(error);
            if (stderr) console.log(stderr);
            if (stdout) {
              console.log(stdout);
            }

          });
        });
      });

    });

  });
};
