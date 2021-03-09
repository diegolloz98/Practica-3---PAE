let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('html', function(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        

})
gulp.task('styles', function(){
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/assets/styles'))
})

