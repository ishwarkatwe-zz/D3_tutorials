var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('es6', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("html", function () {
    return gulp.src("./src/**/*.ejs")
        .pipe(gulp.dest("dist"));
});

gulp.task('serve', ['es6','html'], function () {
    gulp.watch("./src/**/*.js", ['es6']);
    gulp.watch("./src/**/*.ejs", ['html']);
});

// Task
gulp.task('nodemon', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: './dist/index.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('./dist/index.js')
			.pipe(livereload());
	})
});

gulp.task('default', ["serve","nodemon"]);

