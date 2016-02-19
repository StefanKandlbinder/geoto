module.exports = function(grunt) {

  grunt.initConfig({
    compass: {                  // Task
      production: {                   // Target
        options: {              // Target options
          sassDir: 'production/scss',
          cssDir: 'production/css',
          environment: 'production',
          require: 'susy'
        }
      },
      development: {                    // Another target
        options: {
          sassDir: 'development/assets/scss',
          cssDir: 'development/assets/css',
          outputStyle: 'expanded'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js']
    },
    cssmin: {
      options: {
        report: 'gzip'
      },
      target: {
        files: [{
          expand: true,
          cwd: 'development/assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'production/css',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      my_target: {
        files: {
          'production/js/geoto.min.js': [
            // 'development/app/bower_components/jquery/dist/jquery.js',
            'development/app/bower_components/angular/angular.js',
            // 'development/app/bower_components/hammerjs/hammer.js',
            // 'development/app/bower_components/ryanmullins-angular-hammer/angular.hammer.js',
            'development/app/bower_components/angular-route/angular-route.js',
            // 'development/app/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
            'development/app/geoto.js',
            'development/app/shared/photos/photo.sticky.directive.js',
            'development/app/components/photos/gallery.js', 
            'development/app/components/map/map.directive.js', 
            'development/app/components/photos/photo.thumbnail.directive.js',
            'development/app/shared/client/client.geo.service.js',
            'development/app/shared/photos/photo.loaded.directive.js',
            'development/app/shared/photos/photos.area.service.js',
            'development/app/shared/photos/photos.size.service.js'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          dest: 'production/',
          src: ['index.html', 'favicon.ico', 'touch-icon-ipad-retina.png', 'touch-icon-ipad.png', 'touch-icon-iphone-retina.png', 'touch-icon-iphone.png' ]
        },
        {
          expand: true,
          flatten: true,
          dest: 'production/html/components/photos/',
          src: ['development/app/components/photos/*.html']
        },
        {
          expand: true,
          flatten: true,
          dest: 'production/html/components/map/',
          src: ['development/app/components/map/*.html']
        }]
      }
    },
    watch: {
      css: {
        files: ['development/assets/scss/**/*.scss', 'development/**/*.html', 'development/app/**/*.js', 'index.html'],
        tasks: ['compass:development', 'cssmin', 'uglify', 'copy'],
        options: {
          // Start a live reload server on the default port 35729
          // livereload: true,
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['watch', 'jshint', 'compass:development', 'cssmin', 'uglify', 'copy']);

};