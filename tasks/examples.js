module.exports = function (grunt) {
  var ex = require('./lib/examples').init(grunt);
  var fxos = require('./lib/fxos').init(grunt);

  grunt.registerTask('fxos-examples', 'Download Firefox OS app examples', function () {
    var done = this.async();
    var prompt = require('inquirer');

    grunt.log.writeln('\n Available Examples: \n');

    ex.examples.forEach(function(e) {
      grunt.log.writeln('\'' + e.name + '\'' + ' :: ' + e.title);
    });

    prompt.prompt(ex.schema, function (result) {
      // find the selected example
      var selected = grunt.util._.where(ex.examples, { 'name': result.example });

      if (selected) {
        selected = selected[0];
        grunt.log.ok('You\'ve selected: ' + selected.title);
        if (selected.author) {
          grunt.log.writeln('>> Author: '  + selected.author);
        }

        // NOTE: here we have to split directory and copyPath because directory is used for git clone.
        var opts = {
          // git clone this
          repository: selected.git,
          // extract the directory from that git repo
          extract: selected.extract,
          // put that directory into this folder
          directory: selected.name,
          // copy that into this path
          copyPath: 'examples/'
        };

        // download the repo
        fxos.getRepoAndCopy(opts, function(err, dist, copyTo) {
          grunt.log.ok('View ' + copyTo + ' for your example files.');
        });
      }
    });

  });
};
