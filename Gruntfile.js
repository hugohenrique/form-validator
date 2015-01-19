module.exports = function(grunt) {
  'use strict';

  var assets = {
    source: [
      'src/Validator.js',
      'src/Errors.js',
      'src/AddConstraint.js',
      'src/Form.js',
      'src/renderer/InlineErrorRenderer.js',
      'src/renderer/ListRenderer.js',
      'src/renderer/ContainerRenderer.js',
      'src/constraint/Email.js',
      'src/constraint/Equal.js',
      'src/constraint/Format.js',
      'src/constraint/Length.js',
      'src/constraint/NotBlank.js'
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
