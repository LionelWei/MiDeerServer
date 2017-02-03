'use strict';

module.exports = function (grunt) {
  [
    'grunt-cafe-mocha',
    'grunt-contrib-jshint',
    'grunt-exec'
  ].forEach(task => grunt.loadNpmTasks(task));

  grunt.initConfig({
    cafemocha: {
      all: {src: 'qa/test-*.js', options: {ui: 'tdd'}}
    },
    jshint: {
      app: ['mideer.js', ]
    },
    exec: {
      lintchecker: {cmd: 'lintchecker http://localhost:8888'}
    },
  });

  grunt.registerTask('default', 'cafemocha', 'jshint', 'exec');
};
