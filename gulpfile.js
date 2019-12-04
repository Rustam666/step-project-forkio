let gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),  
	csso        = require('gulp-csso'), 
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'), 
    pngquant    = require('imagemin-pngquant'), 
    cache       = require('gulp-cache'), 
    uglifyNew   = require('gulp-uglify-es').default,  
    notify      = require('gulp-notify'),   
    plumber      = require('gulp-plumber'), 
    autprefix   = require('gulp-autoprefixer');
const reload      = browserSync.reload;

gulp.task('start', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("index.html").on('change', browserSync.reload);
    
})

gulp.task("js", function () {
    return gulp.src("src/js/script.js")
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
            return {
                tittle: 'js',
                message: err.message
                };
            })
        }))
        .pipe(concat('main_mini.js'))
        .pipe(uglifyNew(/* options */))
        .pipe(gulp.dest("./dist/js_mini"))
        .pipe(reload({stream: true}))
});

gulp.task('img', function () { 
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./dist/img'))
        .pipe(reload ({stream: true}))
});

gulp.task('sass', function() { 
    return gulp
        .src("src/scss/main_style.scss")
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
            return {
                tittle: 'sass',
                message: err.message,
                templateOptions: {
                  }
                };
            })
        }))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
        .pipe(concat('mini_style.css'))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css_mini'))
        .pipe(reload ({stream: true}))
});

gulp.task('clean', function() {
    return   del.sync(['./dist/img/*','./dist/js_mini/*','./dist/css_mini/*'], {force:true});       
});

gulp.task('cleanOnlyCss', function() {
    return  del.sync(['dist/css_mini/*'], {force:true});       
});

gulp.task('clear', function (callback) { 
    	return cache.clearAll();
})

gulp.task('watch', function() {
    gulp.watch('src/scss/**',function(event, cb) { 
        setTimeout(function(){gulp.start(['cleanOnlyCss','sass']);},500)});
	gulp.watch(['src/js/*.js', 'src/img/*'], ['build']); 
});

gulp.task('build', ['clean','js','sass','img']);  
gulp.task('dev', ['start','watch']);
