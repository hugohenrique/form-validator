module.exports = function(grunt) {
  'use strict';

  var assets = {
    source: [
      'src/Validator.js',
      'src/Errors.js',
      'src/AddConstraint.js',
      'src/Form.js',
      'src/InlineErrorRenderer.js',
      'src/ListRenderer.js',
      'src/ContainerRenderer.js',
      'src/constraints/Email.js',
      'src/constraints/Equal.js',
      'src/constraints/Format.js',
      'src/constraints/Length.js',
      'src/constraints/NotBlank.js'
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
      options: {
        separator: ';'
      },
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
