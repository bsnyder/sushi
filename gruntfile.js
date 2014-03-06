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
      keepAlive: true,
      singleRun: false,
      configFile: "config/protractor.conf.js"
    },
    run_firefox: {
      options: {
        args: {
          seleniumServerJar: 'selenium/selenium-server-standalone-2.40.0.jar',
          seleniumPort: '4444',
          browser: "firefox"
        }
      }
    }
  }  

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-protractor-runner');
  // Default task(s).
  grunt.registerTask('default', ['uglify']);
grunt.registerTask('test', 'Run Protractor using Firefox',
    ['protractor:run_firefox']);

};
