/*
 * grunt-fxos
 * https://github.com/vladikoff/grunt-fxos
 *
 * Copyright (c) 2013 vladikoff
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    fxos: {
      options: {
        src: "app"
      }
    },
    watch: {
      tests: {
        files: 'test/*.js',
        tasks: ['jshint']
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['fxos-intro', 'fxos-env']);

};
