const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();


// File paths
const files = { 
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js',
    htmlPath: 'src/pages/**/*.html',
    assetsPath: 'src/assets/**/*'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([files.jsPath])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

// Cachebust
function cacheBustTask(){
    var cbString = new Date().getTime();
    return src(['src/index.html', files.htmlPath])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Copy
function copy() {
    return src([files.assetsPath])
        .pipe(dest('dist/assets/'));
}

// Clean
function clean() {
    return del(["dist/"]);
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    browserSync.init({
        server: "./dist"
    });
    watch([files.htmlPath, files.scssPath, files.jsPath],
        series(
            parallel(scssTask, jsTask),
            cacheBustTask,
            reload
        )
    );    
}

// BrowserSync Reload
function reload(done) {
    browserSync.reload();
    done();
  }

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    clean,
    parallel(scssTask, jsTask, copy), 
    cacheBustTask,
    watchTask
);

exports.copy = copy;
exports.clean = clean;