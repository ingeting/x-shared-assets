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
        files: {
          '_dist/<%= pkg.version %>/': ['views/*.mustache'],
          '_dist/<%= pkg.versionParts.major %>.x/': ['views/*.mustache'],
          '_dist/<%= pkg.versionParts.major %>.<%= pkg.versionParts.minor %>.x/': ['views/*.mustache'],
          '_dist/dev-master/': ['views/*.mustache']
        },
        options: {layout: 'none', data: 'data/*.json'},
      },
    },
    // Before creating new files, remove files from previous build.
    clean: {
      dist: [
        '_dist/<%= pkg.version %>/',
        '_dist/<%= pkg.versionParts.major %>.x/',
        '_dist/<%= pkg.versionParts.major %>.<%= pkg.versionParts.minor %>.x/',
        '_dist/dev-master/**/*.*'
        ]
    }

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
