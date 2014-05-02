/*
 * button-component
 * https://github.com/upstage/button-component
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        flatten: true,
        prettify: {
          indent: 2,
          condense: true,
          newlines: true
        },
        assets: '_dist/assets',
        helpers: 'templates/helpers/*.js',
        partials: 'templates/includes/*.hbs',
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
      },
      dist: {
        files: {'_dist/<%= pkg.version %>/': ['views/*.mustache']},

      },
    },
    // Before creating new files, remove files from previous build.
    clean: ['dist/**/*.*']

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
