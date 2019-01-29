
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
        var dirname = path.dirname;
        console.log(path.dirname);
        path.dirname  = dirname.replace(new RegExp("themes\\(.*)"),"themes-$1");
        console.log(path.dirname);
    }))
    .pipe(gulp.dest('../_ui/'))

})