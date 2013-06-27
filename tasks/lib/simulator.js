'use strict';

exports.init = function(grunt) {
  var exports = {};
  var os = require('os');
  var http = require('http');
  var fs = require('fs');
  var ncp = require('ncp').ncp;
  var unzip = require('unzip');

  var fxos = require('./fxos').init(grunt);

  var version = 'b2g-18.0.2013-06-12';
  var source = 'http://ftp.mozilla.org/pub/mozilla.org/labs/r2d2b2g/';
  var profilePath = __dirname + '/../../lib/';
  var platform = os.platform();

  // labs http://ftp.mozilla.org/pub/mozilla.org/labs/r2d2b2g/
  var ext = null;
  switch (platform) {
    case 'darwin':
      ext = '.en-US.mac64.dmg';
      break;
    case 'win32':
      ext = '.en-US.win32.zip';
      break;
    case 'linux':
      ext = '.en-US.linux-i686.tar.bz2';
      break;
    default:
      var warn = 'Could not determine your device platform. Please file an issue. Your platform: ' + platform;
      grunt.fail.warn(warn);
  }

  // the name of the simulator download
  var simFile = version + ext;
  // download URL
  var simFileURL = source + version + ext;
  // the simulator file path, saved into temp files
  var simFilePath = fxos.TEMP_PATH + simFile;

  function downloadProfile(callback) {
    var opts = {
      repository: 'https://github.com/vladikoff/firefoxos-sample-profile',
      directory: 'lib',
      copyPath: __dirname + '/../../'
    };
    grunt.log.ok('Downloading profile...');
    // download the repo
    fxos.getRepoAndCopy(opts, callback);
  }

  function getProfile (callback) {
    // directory where the simulator profile should be
    var profileDir = profilePath + 'profile';

    // if there's no profile directory
    if (! fs.existsSync(profileDir)) {
      downloadProfile(function() {
        grunt.log.ok('Unpacking profile...');
        var rS = fs.createReadStream(profilePath + 'profile.zip').pipe(unzip.Extract({ path: profilePath }));

        // done extracting
        rS.on('close', function () {
          callback();
        });
      });

    } else {
      grunt.log.ok('Using existing profile...');
      callback();
    }
  }

  /**
   * Prepare the simulator and the user profile
   * @param callback
   */
  exports.prepare = function(callback) {
    var dlExists = fs.existsSync(simFilePath);
    var profileExists = fs.existsSync(profilePath + 'profile');
    if (dlExists && profileExists) {
      callback();
    } else {
      var fws = fs.createWriteStream(simFilePath);
      grunt.log.ok('No simulator file found. Downloading...');
      // download the simulator file from simFileURL
      http.get(simFileURL, function (response) {
        // if all good
        if (response.statusCode == 200) {
          // save the download
          response.pipe(fws);
          // get the profile so the simulator can run
        } else {
          grunt.fail.warn('Could not download the simulator');
        }
      });

      fws.on('close', function(){
        grunt.log.ok('Done!');
        //callback();
        getProfile(function() {
          callback();
        })

      });

    }

  };

  exports.simFile = simFile;
  exports.simFilePath = simFilePath;

  return exports;
};
