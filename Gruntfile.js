module.exports = function(grunt) {  
  require('jit-grunt')(grunt);


  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "styles/css/style.css": "styles/less/style.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['styles/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};