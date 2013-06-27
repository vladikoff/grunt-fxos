module.exports = function (grunt) {
  const MANIFEST_FILE = 'manifest.webapp';

  var manifest = require('./lib/manifest').init(grunt);
  var fs = require('fs');

  /**
   * Prompt the user for manifest fields, then write to manifest file.
   */
  grunt.registerTask('fxos-manifest', 'Helps you create a manifest.json for your app!', function () {
    var done = this.async();
    var prompt = require('inquirer');

    prompt.prompt(manifest.schema, function (result) {
      //console.log(result);

      // check if there's an existing file, so we don't destroy it
      fs.exists(MANIFEST_FILE, function (exists) {
        var mPath = MANIFEST_FILE;

        // the file is already there, make a timed one
        if (exists) {
          mPath = MANIFEST_FILE + '.' + new Date().getTime();
        }

        fs.writeFile(mPath, manifest.create(result), function (err) {
          if (err) throw err;
          grunt.log.ok("Saved to:" + mPath);
          grunt.log.writeln(manifest.noteFields);
          done(true);
        });
      });
    });

  });

};
