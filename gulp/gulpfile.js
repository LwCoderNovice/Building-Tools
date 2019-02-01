
var gulp =  require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var lesshint = require('gulp-lesshint');
var jshint = require('gulp-jshint');
var sourcemap = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('clean-folder', function() {
    return gulp.src('../_ui/**')
            .pipe(clean({force: true}));
});

gulp.task('less', function() {
    return gulp.src('../src/**/style.less')
            .pipe(lesshint({
                configPath: '.lesshintrc'
                // Options
            }))
            .pipe(less({
                plugins : [autoprefix]
            }))
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)/,"themes-$1");
            }))
            .pipe(gulp.dest('../_ui/'));
});

gulp.task('javascript', function() {
    return gulp.src('../src/**/**.js')
            .pipe(jshint())
            .pipe(concat('main.js'))
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)/,"themes-$1");
            }))
            .pipe(uglify())
            .pipe(gulp.dest('../_ui/'));
});

gulp.task('default', 
    gulp.series('clean-folder', 
        gulp.parallel('less', 'javascript')
    )
);