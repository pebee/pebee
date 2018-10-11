var gulp        = require('gulp'),
    babel       = require('gulp-babel'),
    nodemon     = require('gulp-nodemon'),
    clean       = require('gulp-clean'),
    runSeq      = require('run-sequence');


// clean src
gulp.task('clean', () => {
    return gulp.src('build/**/*.js')
        .pipe(clean());
});


// babel
gulp.task('babel', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build'));
});


// nodemon
gulp.task('nodemon', ['babel'], () => {
    return nodemon({
        script: './build/index.js',
        ext: 'js',
        watch: ['src', 'db'],
        tasks: ['babel']
    }).on('restart', () => {
        console.log('Server restarted');
    }).on('start', () => {
        console.log('Server started');
    });
});


// default
gulp.task('default', function() {
    return runSeq('clean', 'nodemon');
});