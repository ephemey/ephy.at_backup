// Required plugins.
var gulp       = require( 'gulp' );
var browserify = require( 'browserify' );
var less       = require( 'gulp-less' );
var lessclean  = require( 'less-plugin-clean-css' );
var lessprefix = require( 'less-plugin-autoprefix' );
var livereload = require( 'gulp-livereload' );
var rename     = require( 'gulp-rename' );
var transform  = require( 'vinyl-transform' );
var uglify     = require( 'gulp-uglify' );

// Distro details.
var distro = {
  name : 'eston'
};

// Path details.
var path = {
  build : {
    css : './assets/css/',
    js  : './assets/js/',
    hbs : './'
  },
  src : {
    less : './src/less/',
    js   : './src/js/'
  }
};

var glob = {
  build : {
    css : path.build.css + '/*.css',
    js  : path.build.js  + '/*.js',
    hbs : path.build.hbs + '/**/*.hbs'
  },
  src : {
    less    : path.src.less + '/*.less',
    lessAll : path.src.less + '/**/*.less',
    js      : path.src.js   + '/*.js',
    jsAll   : path.src.js   + '/**/*.js'
  }
};

// Error Handler.
var logError = function ( err ) {
  console.log( err.message );
  this.emit( 'end' );
};

// Compile LESS.
gulp.task( 'compile-less' , function () {

  var prefix  = new lessprefix( { browsers: ['last 2 versions'] } );
  var compile = less( { plugins: [ prefix ] } );

  return gulp.src( glob.src.less )
    .pipe( compile )
    .on( 'error', logError )
    .pipe( rename({
      prefix : distro.name + '-'
    }))
    .pipe( gulp.dest( path.build.css ) );

});

// Minify CSS.
gulp.task( 'minify-css', function () {

  var clean   = new lessclean( { advanced: true, aggressiveMerging: true } );
  var prefix  = new lessprefix( { browsers: ['last 2 versions'] } );
  var compile = less( { plugins: [ clean, prefix ] } );

  return gulp.src( glob.src.less )
    .pipe( compile )
    .on( 'error', logError )
    .pipe( rename({
      prefix : distro.name + '-',
      suffix : '.min'
    }))
    .pipe( gulp.dest( path.build.css ) );

});

// Compile JS.
gulp.task( 'compile-js' , function () {

  var compile = transform( function( filename ) {
    var b = browserify( filename );
    return b.bundle();
  });

  return gulp.src( glob.src.js )
    .pipe( compile )
    .on( 'error', logError )
    .pipe( rename({
      prefix : distro.name + '-'
    }))
    .pipe( gulp.dest( path.build.js ) );

});

// Minify JS. 
gulp.task( 'minify-js', function () {

  var compile = transform( function( filename ) {
    var b = browserify( filename );
    return b.bundle();
  });

  return gulp.src( glob.src.js )
    .pipe( compile )
    .on( 'error', logError )
    .pipe( uglify() )
    .pipe( rename({
      prefix : distro.name + '-',
      suffix : '.min'
    }))
    .pipe( gulp.dest( path.build.js ) );
});

// Watch for build file changes.
gulp.task( 'watch-build' , function () {

  var server = livereload();

  return gulp.watch([
    glob.build.css,
    glob.build.js,
    glob.build.hbs
  ]).on( 'change', function( file ) {
    server.changed( file.path );
  });

});

// Watch for source file changes.
gulp.task( 'watch-src' , function () {

  gulp.watch( glob.src.lessAll, [ 'compile-less' ] );
  gulp.watch( glob.src.jsAll,   [ 'compile-js' ] );

});

// Grouped tasks.
gulp.task( 'compile', [ 'compile-less', 'compile-js' ] );
gulp.task( 'minify',  [ 'minify-css', 'minify-js' ] );
gulp.task( 'watch',   [ 'watch-build', 'watch-src' ] );

// Default task.
gulp.task( 'default', [ 'watch', 'compile' ] );
