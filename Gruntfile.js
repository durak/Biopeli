module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/qunit/**/*.html']
    },
    jasmine : {
      pivotal: {
        src: 'src/**/*.js',
        options: {
           specs: 'test/jasmine/*Spec.js',
           helpers: 'test/jasmine/helpers/*Helper.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['qunit', 'jasmine']);

  grunt.registerTask('default', ['qunit', 'jasmine', 'concat', 'uglify']);

};
