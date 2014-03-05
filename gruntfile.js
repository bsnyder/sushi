module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'app/**/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    protractor: {
      options: {
        configFile: 'config/protractor.conf.js',
        keepAlive: true,
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-protractor-runner');
  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
