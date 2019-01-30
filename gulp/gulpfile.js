
var gulp =  require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });


gulp.task('default', function() {
    return  gulp.src('../src/**/style.less')
            .pipe(less({
                plugins : [autoprefix]
            }))
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)/,"themes-$1");
            }))
            .pipe(gulp.dest('../_ui/'));

})