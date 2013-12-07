/*
 * grunt-http
 * https://github.com/johngeorgewright/grunt-contrib-http
 *
 * Copyright (c) 2013 John Wright
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    http: {
      basic: {
        options: {
          url: 'http://www.j-g-w.info'
        },
        dest: 'tmp/basic.html'
      },
      closure: {
        options: {
          form: {
            output_info: 'compiled_code',
            output_format: 'text',
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level: 'default',
          },
          url: 'http://closure-compiler.appspot.com/compile',
          method: 'POST',
          sourceField: 'form.js_code'
        },
        files: {
          'tmp/compiled.js': 'test/fixtures/not-compiled.js'
        }
      },
      ignoreErrors: {
        options: {
          url: 'http://someurlthatdoesntexist.xx',
          method: 'GET',
          ignoreErrors: true
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'http', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
