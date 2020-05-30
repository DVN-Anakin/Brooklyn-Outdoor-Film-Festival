var gulp                = require('gulp'),
    sass                = require('gulp-sass'),
    sourcemaps          = require('gulp-sourcemaps'),
    autoprefixer        = require('gulp-autoprefixer'),
    imagemin            = require('gulp-imagemin'),
    useref              = require('gulp-useref'),
    gulpif              = require('gulp-if'),
    concat              = require('gulp-concat'),
    uglify              = require('gulp-uglify'),
    minify              = require('gulp-minify'),
    babel               = require('gulp-babel'),
    uncss               = require('gulp-uncss'),
    browserSync         = require('browser-sync').create();

gulp.task('css', function(){
    return gulp.src('src/sass/styles.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream())
});

gulp.task('uncss', function(){
    return gulp.src('src/sass/styles.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(uncss({
                html: ['./index.html']
            }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream())
});

gulp.task('copy', function(){
    return gulp.src('src/**/*.html')
            .pipe(useref())
            .pipe(gulp.dest('.'))
            .pipe(browserSync.stream())
});

gulp.task('js', function(){
    return gulp.src('src/javascript/*.js')
            .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(babel({presets: ["env"]}))
            .pipe(uglify())
            .pipe(minify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./javascript'));
});

gulp.task('images', function(){
    return gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('./images'))
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('watch', ['browserSync', 'css'], function(){
    gulp.watch('src/sass/**/*.scss', ['css']);
    gulp.watch('src/**/*.+(html|js)', ['copy']);
})


gulp.task('build', ['copy', 'css', 'js', 'images']);