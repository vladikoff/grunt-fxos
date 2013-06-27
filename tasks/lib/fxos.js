exports.init = function(grunt) {
  const TEMP_PATH = 'tmp/';

  var exec = require('child_process').exec;
  var fs = require('fs');
  var ncp = require('ncp').ncp;
  // The 'concurrency limit' is an integer that represents how many pending file system requests ncp has at a time.
  ncp.limit = 16;
  var exports = {};

  // TODO: this should look for .firefoxos file?
  /**
   * Find the path to a command, return `cmd` if nothing found in the options configs.
   * @param cmd
   * @returns {*}
   */
  exports.run = function (cmd) {
    var path = cmd;
    if (!cmd) {
      grunt.fail.warn('No command in fxos.run(cmd) provided.');
    }

    // Gruntfile config for app directory
    var fxConf = grunt.config('fxos');

    // if we got config and options
    // this is an override option
    if (fxConf && fxConf.options && fxConf.options.paths) {
      // TODO: update this
      var paths = fxConf.options.paths;
      var newPath = path;
      paths.forEach(function(p) {
        if (p.name === cmd.split(' ')[0]) {
          newPath = (p.path + '/' + path + ' ');
        }
      });
      return newPath;
    } else {
      // failed to find options
      return path + ' ';
    }
  };


  // TODO: .tmp?
  /**
   * git clone a repository into tmp
   * @param opts Options object
   * @param opts.repository Repository URL
   * @param opts.directory Repository directory name
   * @param opts.extract A directory to extract from the repository
   * @param opts.copyPath The path to copy the extracted directory to
   * @param cb Callback
   * @returns {*}
   */
  exports.getRepoAndCopy = function (opts, cb) {
    if (!opts || !opts.directory || !opts.repository)
      grunt.fail.warn('getRepo got no repository or destination');

    // tmp git directory
    var dest = TEMP_PATH + opts.directory;
    // copy the app directory for the user
    var copyTo = opts.copyPath + opts.directory;
    // extract a directory
    var extractPath = '';
    // if we want to extract a specific directory
    if (opts.extract)
      extractPath = opts.extract;

    // filter for .git directory, so it doesn't get copied
    var filter = function(name) {
      return name !== '.git';
    };

    // delete the destination first
    grunt.file.delete(dest);
    grunt.file.mkdir(opts.copyPath);

    grunt.log.ok('Downloading: ' + opts.repository + ' to ' + dest);

    exec('git clone ' + opts.repository + ' ' + dest, function (err) {
      if (!err) {
        grunt.log.ok('Download Complete. Copying to ' + copyTo);

        // copy the template folder to the app folder
        ncp(dest + '/' + extractPath, copyTo, {filter: filter}, function (err) {
          if (err) {
            grunt.fail.warn('Warning: Could not copy the app folder from the template!');
            grunt.fail.warn(err);
          }

          if (cb)
            return cb(err, dest, copyTo);
        });
      }
      // else clone failed
      else {
        grunt.fail.warn('Failed to clone repository...');
      }
    });

  };

  exports.TEMP_PATH = TEMP_PATH;

  return exports;
};
