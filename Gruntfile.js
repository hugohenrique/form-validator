module.exports = function(grunt) {
  'use strict';

  var assets = {
    source: [
      'src/validator.js',
      'src/errors.js',
      'src/addConstraint.js',
      'src/form.js',
      'src/renderer/inlineErrorRenderer.js',
      'src/renderer/listRenderer.js',
      'src/renderer/containerRenderer.js',
      'src/constraint/contains.js',
      'src/constraint/date.js',
      'src/constraint/equal.js',
      'src/constraint/email.js',
      'src/constraint/format.js',
      'src/constraint/time.js',
      'src/constraint/length.js',
      'src/constraint/notBlank.js'
    ]
  };

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      production: {
        files: {
          'dist/form-validator.js': assets.source
        }
      }
    },
    concat: {
      dist: {
        files: [
          {
            src: [assets.source],
            dest: 'dist/form-validator.js'
          }
        ]
      }
    },
    watch: {
      script: {
        files: [assets.source],
        tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['development']);
  grunt.registerTask('development', ['concat', 'watch']);
  grunt.registerTask('production', ['uglify:production']);
};

