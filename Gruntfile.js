/*
 * x-shared-assets
 * https://github.com/ingeting/x-shared-assets
 * Copyright (c) 2014 Inge Thorud
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
          '_dist/<%= pkg.version %>/': ['views/*.mustache']
        },
        options: {layout: 'none', data: 'data/*.json'},
      },
    },
    copy: {
      predist: {
        files: [
          {
            expand: true,
            cwd: '_dist/',
            src: ['<%= pkg.version %>/*.html'],
            dest: '_dist/<%= pkg.version %>/mustache/',
            rename: function(dest, src) {
            	var temp = src.substring(0, src.lastIndexOf('.html')) + '.mustache';
              return dest + temp.substring(src.lastIndexOf('/'));
            }
          },
          {
            expand: true,
            cwd: '_dist/',
            src: ['<%= pkg.version %>/*.html'],
            dest: '_dist/<%= pkg.version %>/php/',
            rename: function(dest, src) {
              var temp = src.substring(0, src.lastIndexOf('.html')) + '.php';
              return dest + temp.substring(src.lastIndexOf('/'));
            }
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '_dist/<%= pkg.version %>/',
            src: ['**/*'],
            dest: '_dist/<%= pkg.versionParts.major %>.x/'
          },
          {
            expand: true,
            cwd: '_dist/<%= pkg.version %>/',
            src: ['**/*'],
            dest: '_dist/<%= pkg.versionParts.major %>.<%= pkg.versionParts.minor %>.x/'
          },
          {
            expand: true,
            cwd: '_dist/<%= pkg.version %>/',
            src: ['**/*'],
            dest: '_dist/dev-master/'
          },
        ]
      }
    },
    replace: {
	  mustache: {
	    src: ['_dist/<%= pkg.version %>/mustache/*.mustache'],             // source files array (supports minimatch)
	    overwrite: true,             // destination directory or file
	    replacements: [{
	      from: /<%[ \t]*([A-Z,a-z,0-9,\-,\_]+)[ \t]*%>/g,      // regex replacement ('Fooo' to 'Mooo')
		      to: '{{$1}}'

	    }]
	  },
    php: {
      src: ['_dist/<%= pkg.version %>/php/*.php'],             // source files array (supports minimatch)
      overwrite: true,             // destination directory or file
      replacements: [{
        from: /<%[ \t]*([A-Z,a-z,0-9,\-,\_]+)[ \t]*%>/g,      // regex replacement ('Fooo' to 'Mooo')
          to: '<?php print \$$1; ?>'

      }]
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
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble', 'copy:predist', 'replace', 'copy:dist']);

};
