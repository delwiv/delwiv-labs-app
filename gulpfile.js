// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var recess = require('gulp-recess');
var watch  = require('gulp-watch');
var gutil  = require('gulp-util');
var bower  = require('gulp-bower');

var ngAnnotate = require('gulp-ng-annotate');

gulp.task('watch-js', function () {
    watch('client/js/**/*.js', function(files){
			gulp.start('scripts');	
		});
});

gulp.task('bower', function(){
    return bower()
    .pipe(gulp.dest('client/dist'))
})


// Concatenate JS Files
gulp.task('scripts', function() {
	return gulp.src('client/js/**/*.js')
	.pipe(ngAnnotate())
	//.pipe(recess().on('error', gutil.log))
	.pipe(concat('delwiv-labs-app.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('client/dist'));
});

// Default Task
	gulp.task('default', ['bower']);
