var gulp        = require('gulp');
var jade        = require('gulp-jade');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');

/* SASS */
gulp.task('sass', function () {
  return gulp.src('../sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('jade', function(){
  return gulp.src('_jadefiles/*.jade')
  .pipe(jade())
  .on('error', function(err){
    console.log(err);
    this.emit('end');
  })
  .pipe(gulp.dest('_includes'));
});

/**
 * Watch html and css changes
 */
gulp.task('watch', function () {
    gulp.watch('_jadefiles/**/*.jade', ['jade', 'jade-reload']);
    gulp.watch('_includes/css/style.css', ['css-reload']);
});

//Browser Sync Task
 gulp.task('browser-sync', ['jade'], function() {
	 browserSync({ server: { baseDir: '_includes' }, injectChanges: true, });
 });

 gulp.task('jade-reload', ['jade'], browserSync.reload);

 gulp.task('css-reload', function () {
	 return gulp.src('_includes/css/style.css')
	 .pipe(browserSync.stream({match: '**/**/*.css'}));
 });

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['watch', 'jade', 'browser-sync']);

gulp.task('brackets-onsave', ['js:dev']);

gulp.task('js:dev', function () {
    console.log("reloaded");
});